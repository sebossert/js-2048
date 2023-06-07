var game = {
    moved: false,
    collided: false,
    cells: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ],
    reset: function() {
        this.cells = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
    },
    getFreeCells: function() {
        let freeCells = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i] === 0) {
                freeCells.push(i);
            }
        }
        return freeCells;
    },
    spawn: function() {
        let freeCells = this.getFreeCells();
        let randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
        let spawnNumber = Math.random() > 0.3 ? 2 : 4;
        this.cells[randomCell] = spawnNumber;
        this.moved = false;
    },
    shift: function(stationary, incoming) {
        if (this.cells[stationary] == 0) {
            if (this.cells[incoming] !== 0) {
                this.cells[stationary] = this.cells[incoming];
                this.cells[incoming] = 0;
                this.moved = true;
            }
        }
        else if (!this.collided && this.cells[stationary] === this.cells[incoming]) {
            this.cells[stationary] = this.cells[stationary] + this.cells[incoming];
            this.cells[incoming] = 0;
            this.collided = true;
            this.moved = true;
        }
    },
    moveLeft: function() {
        for (let row = 0; row < 4; row++) {
            for (let i = 0; i < 3; i++) {
                for (let col = 0; col < 3; col++) {
                    let currentCell = (row * 4) + col;
                    let nextCell = currentCell + 1;
                    this.shift(currentCell, nextCell);
                }
            }
            this.collided = false;
        }
        if(this.moved) {
            this.spawn();
        }
    },
    moveRight: function() {
        for (let row = 0; row < 4; row++) {
            for (let i = 0; i < 3; i++) {
                for (let col = 3; col > 0; col--) {
                    let currentCell = (row * 4) + col;
                    let nextCell = currentCell - 1;
                    this.shift(currentCell, nextCell);
                }
            }
            this.collided = false;
        }
        if(this.moved) {
            this.spawn();
        }
    },
    moveUp: function() {
        for (let col = 0; col < 4; col++) {
            for (let i = 0; i < 3; i++) {
                for (let row = 0; row < 3; row++) {
                    let currentCell = (row * 4) + col;
                    let nextCell = currentCell + 4;
                    this.shift(currentCell, nextCell);
                }
            }
            this.collided = false;
        }
        if(this.moved) {
            this.spawn();
        }
    },
    moveDown: function() {
        for (let col = 0; col < 4; col++) {
            for (let i = 0; i < 3; i++) {
                for (let row = 3; row > 0; row--) {
                    let currentCell = (row * 4) + col;
                    let nextCell = currentCell - 4;
                    this.shift(currentCell, nextCell);
                }
            }
            this.collided = false;
        }
        if(this.moved) {
            this.spawn();
        }
    }
}

module.exports = game;