import { loadData, PartOneSolver, PartTwoSolver } from "./index";

describe('day 7', () => {
    describe('solution', () => {
        test('part 1 should return correct test score', () => {
            const generations = loadData('test/data');
            const expectedScore = 37;

            const solver = new PartOneSolver(generations);

            expect(solver.solve()).toEqual(expectedScore);
        });

        test('part 2 should return correct test score', () => {
            const generations = loadData('test/data');
            const expectedScore = 26984457539;

            const solver = new PartTwoSolver(generations);

            expect(solver.solve()).toEqual(expectedScore);
        });
    });
});
