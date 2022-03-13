"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('day 6', () => {
    describe('solution', () => {
        test('part 1 should return correct test score', () => {
            const generations = (0, index_1.loadData)('test/state');
            const expectedScore = 5934;
            const solver = new index_1.PartOneSolver(generations);
            expect(solver.solve()).toEqual(expectedScore);
        });
        test('part 2 should return correct test score', () => {
            const generations = (0, index_1.loadData)('test/state');
            const expectedScore = 26984457539;
            const solver = new index_1.PartTwoSolver(generations);
            expect(solver.solve()).toEqual(expectedScore);
        });
    });
});
//# sourceMappingURL=index.unit.test.js.map