import day4, { loadBoards } from './day-4';
import untypedPulledTestNumbers from './day-4/data/pulledNumbers.json';

// Type imported data
const pulledTestNumbers: number[] = untypedPulledTestNumbers;

// Interface used to call solver function
export interface ISolver {
    solve: () => number;
}

// Solve all defined days
export function solveDays() {
    let solver = new day4.partOne(loadBoards('boards'), pulledTestNumbers);
    console.log(solver.solve());
}

solveDays();