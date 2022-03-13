"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveDays = void 0;
const day_4_1 = __importDefault(require("./day-4"));
const day_5_1 = __importDefault(require("./day-5"));
const day_6_1 = __importDefault(require("./day-6"));
const pulledNumbers_json_1 = __importDefault(require("./day-4/data/pulledNumbers.json"));
// Type imported data
const pulledTestNumbers = pulledNumbers_json_1.default;
// Solve all defined days
function solveDays() {
    let startingDay = 4;
    let solvers = [
        {
            partOne: new day_4_1.default.partOne(day_4_1.default.loadData('boards'), pulledTestNumbers),
            partTwo: new day_4_1.default.partTwo(day_4_1.default.loadData('boards'), pulledTestNumbers)
        },
        {
            partOne: new day_5_1.default.partOne(day_5_1.default.loadData('data')),
            partTwo: new day_5_1.default.partTwo(day_5_1.default.loadData('data'))
        },
        {
            partOne: new day_6_1.default.partOne(day_6_1.default.loadData('state')),
            partTwo: new day_6_1.default.partTwo(day_6_1.default.loadData('state'))
        }
    ];
    solvers.forEach((solver, index) => {
        console.log(`[Day-${startingDay + index}]--------`);
        console.log('Part One: ' + solver.partOne.solve());
        console.log('Part Two: ' + solver.partTwo.solve());
        console.log('\n');
    });
}
exports.solveDays = solveDays;
solveDays();
//# sourceMappingURL=app.js.map