"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartTwoSolver = exports.PartOneSolver = exports.loadData = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Load bingo boards
function loadData(filePath) {
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
exports.loadData = loadData;
class DaySolver {
    constructor(boards, pulledNumbers) {
        this.boards = boards;
        this.pulledNumbers = pulledNumbers;
    }
    findWinningBoard(ignoreWinning = false) {
        let winner = [];
        let index = [];
        let hasWinner = false;
        // Loop over all pulled numbers in order
        for (let curNumber = 0; curNumber < this.pulledNumbers.length; curNumber++) {
            // Loop over all boards to determine if it contains the current number
            for (let curBoard = 0; curBoard < this.boards.length; curBoard++) {
                // We determine if this marking made the current board a winning board
                let isWinner = this.markNumberOnBoard(this.boards[curBoard], this.pulledNumbers[curNumber]);
                if (isWinner) {
                    // hasWinner determines if a winner has been found in the current pulled number iteration
                    if (!hasWinner) {
                        hasWinner = true;
                    }
                    this.lastPulledNumber = this.pulledNumbers[curNumber];
                    // If ignoreWinning is true, we want to continue marking the boards in order
                    // to keep the score for later winners correct. If ignoreWinning is false we do
                    // not care about other winners, so we canr return.
                    if (!ignoreWinning) {
                        return [[this.boards[curBoard]], [curBoard]];
                    }
                    else {
                        //console.log('winner!')
                        winner.push(this.boards[curBoard]);
                        index.push(curBoard);
                    }
                }
            }
            // After finishing marking all boards when a winner is found (for the current pulled number),
            // we stop marking of upcoming numbers
            if (ignoreWinning && hasWinner) {
                return [winner, index];
            }
        }
        return [undefined, undefined];
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
// Class used to solve part one of day 4
class PartOneSolver extends DaySolver {
    constructor(boards, pulledNumbers) {
        super(boards, pulledNumbers);
    }
    solve() {
        let [winners, _] = this.findWinningBoard();
        // If winner is not defined it means that no board has a full row or column
        if (winners === undefined) {
            return 0;
        }
        return this.calculateScore(winners[0]);
    }
}
exports.PartOneSolver = PartOneSolver;
// Class used to solve part two of day 4
class PartTwoSolver extends DaySolver {
    constructor(boards, pulledNumbers) {
        super(boards, pulledNumbers);
    }
    solve() {
        // Amount of boards remaining in the game
        let boardsLeft = this.boards.length;
        let [winners, indexes] = [undefined, undefined];
        // Keep iterating until the winner from the final 2 boards is found
        while (boardsLeft > 0) {
            [winners, indexes] = this.findWinningBoard(true);
            // If winner is not defined it means that no board has a full row or column,
            // index is included to prevent TS error
            if (winners === undefined || indexes === undefined) {
                return 0;
            }
            // Iterate over all found winners
            winners.forEach((winner) => {
                // Split the winning board
                this.boards.splice(this.boards.findIndex(function (board) {
                    // Determine the index of the board by checking which board in the array has the same
                    // number array as the winner number array
                    return board.numbers === winner.numbers;
                }), 1);
                boardsLeft--;
            });
        }
        if (winners === undefined) {
            return 0;
        }
        return this.calculateScore(winners[0]);
    }
}
exports.PartTwoSolver = PartTwoSolver;
// Export to app
exports.default = { partOne: PartOneSolver, partTwo: PartTwoSolver, loadData };
//# sourceMappingURL=index.js.map