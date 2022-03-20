import path from 'path';
import fs from 'fs';
import { IPartSolver } from "../app";

export function loadData(filePath: string): number[] {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `./data/${filePath}.json`), 'utf-8'));
}

// Class containing logic that applies to both parts
abstract class DaySolver implements IPartSolver {
    crabPositions: number[];
    searchSpace: number;

    constructor(crabPositions: number[]) {
        // sort ascending
        this.crabPositions = crabPositions.sort(function (a, b) { return a - b });
        this.searchSpace = crabPositions.length / 2;
    }

    public solve(): number {
        let score: number;
        let maxvalue = this.crabPositions[this.crabPositions.length - 1];
        let position: number = this.crabPositions.length / 2;

        let foundPosition = this.calculateLowestNeigbour(position);
        // Keep trying to find new positions
        while (foundPosition != position) {
            this.searchSpace = this.searchSpace / 2;
            foundPosition = this.calculateLowestNeigbour(position);

        }
        return foundPosition//this.calculateCost(foundPosition);
    }

    private calculateLowestNeigbour(position: number): number {
        let cost: number = this.calculateCost(position);

        for (let i = 0; i < this.searchSpace; i++) {
            let leftCost = this.calculateCost(position - i);
            let rightCost = this.calculateCost(position + i);

            // check if left has lower cost
            if (cost - leftCost > 0) {
                console.log("crabs can better go to: " + (position - i) + "where the cost is " + leftCost)
                return position - position / 2;
            }
            // check if right has lower cost
            if (cost - rightCost > 0) {
                console.log("crabs can better go to: " + (position + i) + "where the cost is " + rightCost)
                return position + position / 2;
            }
        }

        // no lower cost was found
        return position;
    }

    private calculateCost(position: number): number {
        let cost: number = 0;
        this.crabPositions.forEach((crabPosition) => {
            cost += Math.abs(crabPosition - position)
        })
        return cost;
    }
}

// Class used to solve part one of day 6
export class PartOneSolver extends DaySolver {

    constructor(crabPositions: number[]) {
        super(crabPositions)
    }
}

// Class used to solve part two of day 6
export class PartTwoSolver extends DaySolver {

    constructor(crabPositions: number[]) {
        super(crabPositions)
    }

}

// Export to app
export default { partOne: PartOneSolver, partTwo: PartTwoSolver, loadData };