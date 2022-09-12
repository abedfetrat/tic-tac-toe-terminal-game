const prompt = require('prompt-sync')({ sigint: true });

class Game {
    constructor() {
        this.x = 'X';
        this.o = 'O';
        this.turn = this.x;
        this.board = new Array(9).fill(' ');
        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
    printBoard() {
        let print = '\n';
        for (let i = 0; i < this.board.length; i++) {
            print += `[ ${this.board[i]} ]`;
            if ((i + 1) % 3 === 0) {
                print += '\n';
            }
        }
        console.log(print);
    }
    printWinner() {
        if (this.winner === this.x) {
            console.log('You win! \n');
        } else if (this.winner === this.o) {
            console.log('Computer wins! \n');
        } else {
            console.log("It's a draw! \n");
        }
    }
    getPlayerMove() {
        let cell = parseInt(prompt('Where do you wan\'t to place your mark? '));
        while (!cell || cell < 1 || cell > 9 || this.board[cell - 1] != ' ') {
            cell = parseInt(prompt('Invalid input. Try again: '));
        }
        this.board[--cell] = this.x;
    }
    getComputerMove() {
        let cell = Math.ceil(Math.random() * 9);
        while (this.board[cell] != ' ') {
            cell = Math.ceil(Math.random() * 9);
        }
        this.board[cell] = this.o;
    }
    isThreeInRow(mark) {
        for (const combination of this.winningCombinations) {
            const isCombination = combination.every(cellIndex => this.board[cellIndex] === mark)
            if (isCombination) return true;
        }
        return false;
    }
    checkForWin() {
        if (this.isThreeInRow(this.x)) {
            this.winner = this.x;
            this.printBoard();
            this.printWinner();
            this.playing = false;
            return;
        } else if (this.isThreeInRow(this.o)) {
            this.winner = this.o;
            this.printBoard();
            this.printWinner();
            this.playing = false;
            return;
        }
        // If there are no cells left to mark
        // It's a draw
        if (!this.board.includes(' ')) {
            this.winner = 'draw';
            this.printBoard();
            this.printWinner();
            this.playing = false;
        }
    }
    play() {
        this.playing = true;
        while (this.playing) {
            console.clear();
            this.printBoard();
            if (this.turn === this.x) {
                // Players turn
                this.getPlayerMove();
                this.checkForWin();
                this.turn = this.o;
            } else {
                // Computers turn
                this.getComputerMove();
                this.checkForWin();
                this.turn = this.x;
            }
        }
    }
}

console.log(`
============= Tic-Tac-Toe =============
X = You
O = Computer
How to play: 
Input number(1 - 9) coresponding to the 
cell you want to place your mark.
---------------------------------------
`);

prompt('Press Enter to start the game ')

const game = new Game();
game.play();

let playAgain = prompt('Play Again? (y/n) ');
while (playAgain === 'y') {
    const game = new Game();
    game.play();
    playAgain = prompt('Play Again? (y/n) ');
}