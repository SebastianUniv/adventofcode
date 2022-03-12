"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartTwoSolver = exports.PartOneSolver = exports.loadBoards = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Load bingo boards
function loadBoards(filePath) {
    const data = fs_1.default.readFileSync(path_1.default.join(__dirname, `./data/${filePath}.txt`), 'utf-8');
    let boards = [];
    // Split loaded text data into lines so that they can be parsed separately
    const lines = data.split('\r\n');
    let lineCount = 0;
    let board;
    for (let i = 0; i < lines.length; i++) {
        lineCount++;
        // Boards are seperated by an empty line,
        // so every 6th line needs to be skipped
        if (lineCount > 5) {
            lineCount = 0;
            continue;
        }
        // After all lines of a board have been parsed,
        // push it to array
        if (lineCount === 5) {
            if (board) {
                boards.push(board);
            }
        }
        // Boards start at the first line,
        // so construct the object if this is the case
        if (lineCount === 1) {
            board = {
                numbers: [[], [], [], [], []],
                columnCount: new Array(5).fill(0),
                rowCount: new Array(5).fill(0)
            };
        }
        // Prevent TS error, this should never evaluate to true
        if (!board) {
            continue;
        }
        // Parse current line to array of numbers,
        // add it to certain board row depending on the lineCount
        board.numbers[lineCount - 1] = lines[i].trim().split(/\s+/g).map(Number);
    }
    return boards;
}
exports.loadBoards = loadBoards;
// Class used to solve part one of day 4
class PartOneSolver {
    constructor(boards, pulledNumbers) {
        this.boards = boards;
        this.pulledNumbers = pulledNumbers;
    }
    solve() {
        let winner = this.findWinningBoard();
        console.log(winner);
        // If winner is not defined it means that no board has a full row or column
        if (!winner) {
            return 0;
        }
        return this.calculateScore(winner);
    }
    findWinningBoard() {
        // Loop over all pulled numbers in order
        for (let curNumber = 0; curNumber < this.pulledNumbers.length; curNumber++) {
            // Loop over all boards to determine if it contains the current number
            for (let curBoard = 0; curBoard < this.boards.length; curBoard++) {
                let isWinner = this.markNumberOnBoard(this.boards[curBoard], this.pulledNumbers[curNumber]);
                if (isWinner) {
                    this.lastPulledNumber = this.pulledNumbers[curNumber];
                    return this.boards[curBoard];
                }
            }
        }
        return undefined;
    }
    markNumberOnBoard(board, number) {
        // Loop over all numbers of the board
        for (let i = 0; i < board.numbers.length; i++) {
            for (let j = 0; j < board.numbers[i].length; j++) {
                // Compare current number of board to current pulled number
                if (board.numbers[i][j] === number) {
                    // Set cell to negative value so it is not included in
                    // future score calculation
                    board.numbers[i][j] = -1;
                    board.rowCount[i] += 1;
                    board.columnCount[j] += 1;
                    // Check if the current board has a complete column or row
                    if (board.columnCount[j] === 5 || board.rowCount[i] === 5) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    calculateScore(board) {
        let score = 0;
        // Loop over all numbers of the board
        for (let i = 0; i < board.numbers.length; i++) {
            for (let j = 0; j < board.numbers[i].length; j++) {
                let num = board.numbers[i][j];
                // Only use positive numbers to determine score
                if (num > 0) {
                    score += num;
                }
            }
        }
        return score * this.lastPulledNumber;
    }
}
exports.PartOneSolver = PartOneSolver;
// Class used to solve part two of day 4
class PartTwoSolver {
    constructor(boards, pulledNumbers) {
        this.boards = boards;
        this.pulledNumbers = pulledNumbers;
    }
    solve() {
        return 0;
    }
}
exports.PartTwoSolver = PartTwoSolver;
// Export to app
exports.default = { partOne: PartOneSolver, partTwo: PartTwoSolver };
//# sourceMappingURL=index.js.map