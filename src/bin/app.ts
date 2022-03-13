import day4 from './day-4';
import day5 from './day-5';
import untypedPulledTestNumbers from './day-4/data/pulledNumbers.json';

// Type imported data
const pulledTestNumbers: number[] = untypedPulledTestNumbers;

// Interface used to call solver function
export interface IPartSolver {
    solve: () => number;
}

interface DaySolver {
    partOne: IPartSolver,
    partTwo: IPartSolver
}

// Solve all defined days
export function solveDays() {
    let startingDay = 4;
    let solvers: DaySolver[] = [
        {
            partOne: new day4.partOne(day4.loadData('boards'), pulledTestNumbers),
            partTwo: new day4.partTwo(day4.loadData('boards'), pulledTestNumbers)
        },
        {
            partOne: new day5.partOne(day5.loadData('data')),
            partTwo: new day5.partTwo(day5.loadData('data'))
        }
    ];

    solvers.forEach((solver, index) => {
        console.log(`[Day-${startingDay + index}]--------`);
        console.log('Part One: ' + solver.partOne.solve());
        console.log('Part Two: ' + solver.partTwo.solve());
    })
}

solveDays();