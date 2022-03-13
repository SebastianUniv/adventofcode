import { loadBoards, PartOneSolver, PartTwoSolver } from './index';
import untypedPulledTestNumbers from './data/test/pulledNumbers.json';

// Type imported data
const pulledTestNumbers: number[] = untypedPulledTestNumbers;

describe('day 4', () => {
    describe('data', () => {
        // Check data is valid for both test and real data
        const cases = [[loadBoards('test/boards')], [loadBoards('boards')]]

        test.each(cases)('should return correct bingo board objects', (boards) => {
            boards.forEach(board => {
                // Make sure object structure is correct
                expect(board).toEqual({
                    numbers: expect.arrayContaining([expect.arrayContaining([expect.any(Number)])]),
                    columnCount: expect.arrayContaining([expect.any(Number)]),
                    rowCount: expect.arrayContaining([expect.any(Number)])
                });
            });
        });
        test.each(cases)('should return bingo board objects with correct amount of numbers', (boards) => {
            boards.forEach(board => {
                // Check that it contains the correct amount of numbers
                expect(board.numbers).toHaveLength(5);
                board.numbers.forEach(array => {
                    expect(array).toHaveLength(5);
                });
                expect(board.columnCount).toHaveLength(5);
                expect(board.rowCount).toHaveLength(5);
            });
        });
    });

    describe('solution', () => {
        test('part 1 should return correct test score', () => {
            const boards = loadBoards('test/boards');
            const expectedScore = 4512;

            const solver = new PartOneSolver(boards, pulledTestNumbers);

            expect(solver.solve()).toEqual(expectedScore);
        });

        test('part 2 should return correct test score', () => {
            const boards = loadBoards('test/boards');
            const expectedScore = 1924;

            const solver = new PartTwoSolver(boards, pulledTestNumbers);

            expect(solver.solve()).toEqual(expectedScore);
        });
    });
});


