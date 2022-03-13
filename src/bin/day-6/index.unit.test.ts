import { loadData, PartOneSolver, PartTwoSolver } from "./index";

describe('day 6', () => {
    describe('solution', () => {
        test('part 1 should return correct test score', () => {
            const generations = loadData('test/state');
            const expectedScore = 5934;

            const solver = new PartOneSolver(generations);

            expect(solver.solve()).toEqual(expectedScore);
        });

        test('part 2 should return correct test score', () => {
            const generations = loadData('test/state');
            const expectedScore = 26984457539;

            const solver = new PartTwoSolver(generations);

            expect(solver.solve()).toEqual(expectedScore);
        });
    });
});
