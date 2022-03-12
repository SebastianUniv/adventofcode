"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const pulledNumbers_json_1 = __importDefault(require("./data/test/pulledNumbers.json"));
// Type imported data
const pulledTestNumbers = pulledNumbers_json_1.default;
describe('bingo boards', () => {
    // Check data is valid for both test and real data
    const cases = [[(0, index_1.loadBoards)('test/boards')], [(0, index_1.loadBoards)('boards')]];
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
        const boards = (0, index_1.loadBoards)('test/boards');
        const expectedScore = 4512;
        const solver = new index_1.PartOneSolver(boards, pulledTestNumbers);
        expect(solver.solve()).toEqual(expectedScore);
    });
});
//# sourceMappingURL=index.unit.test.js.map