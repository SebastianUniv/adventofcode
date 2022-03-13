import path from 'path';
import fs from 'fs';
import { IPartSolver } from "../app";

type Point = {
    x: number;
    y: number;
}

enum Orientation {
    Point,
    Horizontal,
    Vertical,
    Left,
    Right
}

export type Line = {
    start: Point;
    end: Point;
    orientation: Orientation;
}

export function loadData(filePath: string): Line[] {
    const data = fs.readFileSync(path.join(__dirname, `./data/${filePath}.txt`), 'utf-8');
    let ventLines: Line[] = [];

    // Split loaded text data into lines so that they can be parsed separately
    const lines = data.split('\r\n');

    for (let i = 0; i < lines.length; i++) {
        // Split line into two points
        let points = lines[i].trim().split(/->/g);
        // Split points into coordinates
        let [x, y] = points[0].trim().split(/,/g).map(Number);
        let start: Point = { x, y };

        [x, y] = points[1].trim().split(/,/g).map(Number);
        let end: Point = { x, y };
        // Check the orientation of the line
        let orientation: Orientation | undefined = undefined;
        if (start.x === end.x) {
            orientation = Orientation.Vertical;
            // Swap if starting point has higher value
            if (start.y > end.y) {
                [start, end] = [end, start];
            }
        }
        if (start.y === end.y) {
            // If orientation is already set, the line is a point
            if (orientation) {
                orientation = Orientation.Point;
            } else {
                orientation = Orientation.Horizontal;
                // Swap if starting point has higher value
                if (start.x > end.x) {
                    [start, end] = [end, start];
                }
            }
        }
        // If no case matches, the line must be diagonal
        if (!orientation) {
            // We want the lowest vertical point as the start position,
            // as this point determines the direction in orientation
            if (start.y > end.y) {
                [start, end] = [end, start];
            }
            if (start.x > end.x) {
                orientation = Orientation.Left;
            } else {
                orientation = Orientation.Right;
            }
        }
        // Create line
        let line: Line = { start, end, orientation };

        ventLines.push(line);
    }

    return ventLines;
}

abstract class DaySolver implements IPartSolver {
    lines: Line[];
    diagram: number[][];

    constructor(lines: Line[]) {
        this.lines = lines;
        // Define diagram based on maximum coordinates of points
        let maxX = Math.max.apply(Math, this.lines.map(function (line) { return Math.max(line.start.x, line.end.x); }));
        let maxY = Math.max.apply(Math, this.lines.map(function (line) { return Math.max(line.start.y, line.end.y); }));
        // +1 accounts for 0 value
        this.diagram = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0));
    }

    abstract solve(): number;

    protected mapLinesToDiagram() {
        this.lines.forEach(line => {
            let lineLength: number | undefined;
            let tracker: Point | undefined;
            // Add vents to diagram based on the orientation
            switch (line.orientation as Orientation) {
                case Orientation.Point:
                    this.diagram[line.start.y][line.start.x] += 1;
                    break;
                case Orientation.Horizontal:
                    lineLength = line.end.x - line.start.x;

                    for (let i = 0; i < (lineLength + 1); i++) {
                        this.diagram[line.start.y][line.start.x + i] += 1;
                    }
                    break;
                case Orientation.Vertical:
                    lineLength = line.end.y - line.start.y;

                    for (let i = 0; i < (lineLength + 1); i++) {
                        this.diagram[line.start.y + i][line.start.x] += 1;
                    }
                    break;
                case Orientation.Left:
                    tracker = line.start;
                    if (!tracker) {
                        return;
                    }
                    // Keep adding vents until the tracking point is the same as the end point
                    while (line.end.x - 1 != tracker.x && line.end.y + 1 != tracker.y) {
                        this.diagram[tracker.y][tracker.x] += 1;
                        tracker.x -= 1;
                        tracker.y += 1;
                    }
                    break;
                case Orientation.Right:
                    tracker = line.start;
                    if (!tracker) {
                        return;
                    }
                    // Keep adding vents until the tracking point is the same as the end point
                    while (line.end.x + 1 != tracker.x && line.end.y + 1 != tracker.y) {
                        this.diagram[tracker.y][tracker.x] += 1;
                        tracker.x += 1;
                        tracker.y += 1;
                    }
                    break;
            }
        });
    }

    protected calculateScore(): number {
        let score: number = 0;

        for (let y = 0; y < this.diagram.length; y++) {
            for (let x = 0; x < this.diagram[y].length; x++) {
                if (this.diagram[y][x] >= 2) {
                    score += 1;
                }
            }
        }
        return score;
    }
}

// Class used to solve part one of day 5
export class PartOneSolver extends DaySolver {

    constructor(lines: Line[]) {
        super(lines);
    }

    public solve(): number {
        this.removeDiagonalLines();
        this.mapLinesToDiagram();
        return this.calculateScore();;
    }

    private removeDiagonalLines() {
        let filteredLines: Line[] = [];

        this.lines.forEach(line => {
            if (line.orientation === Orientation.Left || line.orientation === Orientation.Right) {
                return;
            }
            filteredLines.push(line);
        });

        this.lines = filteredLines;
    }
}

// Class used to solve part two of day 5
export class PartTwoSolver extends DaySolver {

    constructor(lines: Line[]) {
        super(lines);
    }

    public solve(): number {
        this.mapLinesToDiagram();
        return this.calculateScore();
    }
}

// Export to app
export default { partOne: PartOneSolver, partTwo: PartTwoSolver, loadData };