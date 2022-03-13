"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartTwoSolver = exports.PartOneSolver = exports.loadData = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function loadData(filePath) {
    const fishes = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, `./data/${filePath}.json`), 'utf-8'));
    let generations = [];
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
exports.loadData = loadData;
class DaySolver {
    constructor(generations) {
        this.allowedTime = 0;
        this.generations = generations;
    }
    solve() {
        let score = 0;
        let time = 0;
        while (time < this.allowedTime) {
            this.tick();
            time++;
        }
        this.generations.forEach(gen => {
            score += gen.population;
        });
        return score;
    }
    tick() {
        // Decrease internal timer for every population
        this.generations.forEach((generation) => {
            generation.timer -= 1;
        });
        let generation = this.generations.shift();
        if (generation) {
            generation.timer = 8;
            this.generations[6].population += generation.population;
            this.generations.push(generation);
        }
    }
}
// Class used to solve part one of day 6
class PartOneSolver extends DaySolver {
    constructor(generations) {
        super(generations);
        this.allowedTime = 80;
    }
}
exports.PartOneSolver = PartOneSolver;
// Class used to solve part two of day 6
class PartTwoSolver extends DaySolver {
    constructor(generations) {
        super(generations);
        this.allowedTime = 256;
    }
}
exports.PartTwoSolver = PartTwoSolver;
// Export to app
exports.default = { partOne: PartOneSolver, partTwo: PartTwoSolver, loadData };
//# sourceMappingURL=index.js.map