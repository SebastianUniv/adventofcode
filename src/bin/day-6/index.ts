import path from 'path';
import fs from 'fs';
import { IPartSolver } from "../app";

// Generation is defined as a group of fishes that have the same internal timer
type Generation = {
    population: number;
    timer: number;
}

export function loadData(filePath: string): Generation[] {
    const fishes: number[] = JSON.parse(fs.readFileSync(path.join(__dirname, `./data/${filePath}.json`), 'utf-8'));
    let generations: Generation[] = [];

    // Create all possible internal timer values as a generation
    for (let i = 0; i < 9; i++) {
        generations.push({ population: 0, timer: i });
    }

    // Insert all fished into corresponding generation
    fishes.forEach(fish => {
        generations[fish].population += 1;
    });

    return generations;
}

// Class containing logic that applies to both parts
abstract class DaySolver implements IPartSolver {
    generations: Generation[]
    allowedTime: number = 0;

    constructor(generations: Generation[]) {
        this.generations = generations;
    }

    public solve(): number {
        let score: number = 0;
        let time: number = 0;

        while (time < this.allowedTime) {
            this.tick();
            time++;
        }

        // Score is determined by the amount of fishes
        this.generations.forEach(gen => {
            score += gen.population;
        })

        return score;
    }

    private tick() {
        // Decrease internal timer for every population
        this.generations.forEach((generation) => {
            generation.timer -= 1;
        });

        // Remove the generation with negative timer,
        // this generation splits into two groups
        let generation = this.generations.shift();

        if (generation) {
            // Reset timer
            generation.timer = 8;
            // Add existing fishes of shifted generation back into array
            this.generations[6].population += generation.population;
            // Add new fishes of shifted generation back into array
            this.generations.push(generation);
        }
    }
}

// Class used to solve part one of day 6
export class PartOneSolver extends DaySolver {

    constructor(generations: Generation[]) {
        super(generations);
        this.allowedTime = 80;
    }
}

// Class used to solve part two of day 6
export class PartTwoSolver extends DaySolver {

    constructor(generations: Generation[]) {
        super(generations);
        this.allowedTime = 256;
    }

}

// Export to app
export default { partOne: PartOneSolver, partTwo: PartTwoSolver, loadData };