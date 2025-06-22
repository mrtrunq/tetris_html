var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* CONSTANT */
var COLS = 10;
var ROWS = 20;
var BLOCK_SIZE = 30;
var COLOR_MAPPING = ["red", "orange", "green", "purple", "blue", "cyan", "yellow", "white"];
var WHITE_COLOR_ID = 7;
var KEY_CODES = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    UP: "ArrowUp",
    DOWN: "ArrowDown",
};
var BRICK_LAYOUT = [
    // Brick left 'L'
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    // Brick right 'L'
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    // Brick 3 left 'N'
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    // Brick 3 right 'N'
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    // Brick 5 '|'
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    // Brick 6 '[]'
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    // Brick 7 'T'
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];
// Canvas
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
// Board
var Board = /** @class */ (function () {
    function Board(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
        this.clearAudio = new Audio("./assets/clear.wav");
    }
    Board.prototype.generateWhiteBoard = function () {
        return Array.from({ length: ROWS }, function () { return Array(COLS).fill(WHITE_COLOR_ID); });
    };
    Board.prototype.drawCell = function (xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    };
    Board.prototype.drawBoard = function () {
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    };
    Board.prototype.handleCompleteRows = function () {
        var latestGrid = board.grid.filter(function (row) {
            return row.some(function (col) { return col === WHITE_COLOR_ID; });
        });
        var newScore = ROWS - latestGrid.length;
        var newRows = Array.from({ length: newScore }, function () { return Array(COLS).fill(WHITE_COLOR_ID); });
        if (newScore) {
            board.grid = __spreadArray(__spreadArray([], newRows, true), latestGrid, true);
            this.handleScore(newScore * 10);
            this.clearAudio.play();
        }
    };
    Board.prototype.handleScore = function (newScore) {
        this.score += newScore;
        document.getElementById("score").innerHTML = String(this.score);
    };
    Board.prototype.handleGameOver = function () {
        this.gameOver = true;
        this.isPlaying = false;
        alert("Game Over!");
    };
    Board.prototype.reset = function () {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard();
    };
    return Board;
}());
// Brick
var Brick = /** @class */ (function () {
    function Brick(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2;
    }
    Brick.prototype.draw = function () {
        for (var row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (var col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    };
    Brick.prototype.clear = function () {
        for (var row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (var col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    };
    Brick.prototype.moveLeft = function () {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    };
    Brick.prototype.moveRight = function () {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    };
    Brick.prototype.moveDown = function () {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();
        if (!board.gameOver) {
            generateNewBrick();
        }
    };
    Brick.prototype.rotate = function () {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    };
    Brick.prototype.checkCollision = function (nextRow, nextCol, nextLayout) {
        for (var row = 0; row < nextLayout.length; row++) {
            for (var col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (col + nextCol < 0 || col + nextCol >= COLS || row + nextRow >= ROWS || board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Brick.prototype.handleLanded = function () {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }
        for (var row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (var col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        board.handleCompleteRows();
        board.drawBoard();
    };
    return Brick;
}());
// Random brick
var brick;
var generateNewBrick = function () {
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
};
// Start
var board = new Board(ctx);
board.drawBoard();
document.getElementById("play").addEventListener("click", function () {
    board.reset();
    board.isPlaying = true;
    generateNewBrick();
    var refresh = setInterval(function () {
        if (!board.gameOver) {
            brick.moveDown();
        }
        else {
            clearInterval(refresh);
        }
    }, 1000);
});
// Interactive
document.addEventListener("keydown", function (e) {
    if (!board.gameOver && board.isPlaying) {
        switch (e.code) {
            case KEY_CODES.LEFT:
                brick.moveLeft();
                break;
            case KEY_CODES.RIGHT:
                brick.moveRight();
                break;
            case KEY_CODES.DOWN:
                brick.moveDown();
                break;
            case KEY_CODES.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }
});
