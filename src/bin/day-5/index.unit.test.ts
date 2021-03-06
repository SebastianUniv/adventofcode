import { Line, loadData, PartOneSolver, PartTwoSolver } from "./index";

describe('day 5', () => {
    describe('data', () => {
        const ventTestLines = loadData('test/data');
        const expected: Line[] = [
            { start: { x: 0, y: 9 }, end: { x: 5, y: 9 }, orientation: 1 },
            { start: { x: 8, y: 0 }, end: { x: 0, y: 8 }, orientation: 3 },
            { start: { x: 3, y: 4 }, end: { x: 9, y: 4 }, orientation: 1 },
            { start: { x: 2, y: 1 }, end: { x: 2, y: 2 }, orientation: 2 },
            { start: { x: 7, y: 0 }, end: { x: 7, y: 4 }, orientation: 2 },
            { start: { x: 2, y: 0 }, end: { x: 6, y: 4 }, orientation: 4 },
            { start: { x: 0, y: 9 }, end: { x: 2, y: 9 }, orientation: 1 },
            { start: { x: 1, y: 4 }, end: { x: 3, y: 4 }, orientation: 1 },
            { start: { x: 0, y: 0 }, end: { x: 8, y: 8 }, orientation: 4 },
            { start: { x: 8, y: 2 }, end: { x: 5, y: 5 }, orientation: 3 }
        ];

        test('should return correct vent line array', () => {
            expect(ventTestLines).toStrictEqual(expected);
        });
    });

    describe('solution', () => {
        test('part 1 should return correct test score', () => {
            const ventLines = loadData('test/data');
            const expectedScore = 5;

            const solver = new PartOneSolver(ventLines);

            expect(solver.solve()).toEqual(expectedScore);
        });

        test('part 2 should return correct test score', () => {
            const ventLines = loadData('test/data');
            const expectedScore = 12;

            const solver = new PartTwoSolver(ventLines);

            expect(solver.solve()).toEqual(expectedScore);
        });
    });
});
