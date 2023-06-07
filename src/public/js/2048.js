var moved = false;
var collided = false;
const cells = document.getElementsByClassName('cell');

const moveFunctions = {
    'ArrowLeft': moveLeft,
    'ArrowRight': moveRight,
    'ArrowUp': moveUp,
    'ArrowDown': moveDown
};
document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        if (moveFunctions.hasOwnProperty(keyName)) {
            moveFunctions[keyName]();
        }
        if (moved) {
            spawn();
            updateHtml();
        }
    },
    false
);
function updateHtml(htmlCells, logicCells) {
    for(let i = 0; i < logicCells.length; i++) {
        htmlCells[i].innerHTML = logicCells[i];
    }
}
function getFreeCells() {
    let freeCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == "") {
            freeCells.push(cells[i]);
        }
    }
    return freeCells;
}
function spawn() {
    let freeCells = getFreeCells();
    let randomCell = Math.floor(Math.random() * freeCells.length);
    let spawnNumber = Math.random() > 0.3 ? 2 : 4;
    freeCells[randomCell].innerHTML = spawnNumber;
    moved = false;
    collided = false;
}
function shift(stationary, incoming) {
    if (stationary.innerHTML == "") {
        if (incoming.innerHTML !== "") {
            stationary.innerHTML = incoming.innerHTML;
            incoming.innerHTML = "";
            moved = true;
        }
    }
    else if (!collided && stationary.innerHTML == incoming.innerHTML) {
        stationary.innerHTML = parseInt(stationary.innerHTML) + parseInt(incoming.innerHTML);
        incoming.innerHTML = "";
        collided = true;
        moved = true;
    }
}
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        for (let i = 0; i < 3; i++) {
            for (let col = 0; col < 3; col++) {
                let currentCell = (row * 4) + col;
                let nextCell = currentCell + 1;
                shift(cells[currentCell], cells[nextCell]);
            }
        }
        collided = false;
    }
}
function moveRight() {
    for (let row = 0; row < 4; row++) {
        for (let i = 0; i < 3; i++) {
            for (let col = 3; col > 0; col--) {
                let currentCell = (row * 4) + col;
                let nextCell = currentCell - 1;
                shift(cells[currentCell], cells[nextCell]);
            }
        }
        collided = false;
    }
}
function moveUp() {
    for (let col = 0; col < 4; col++) {
        for (let i = 0; i < 3; i++) {
            for (let row = 0; row < 3; row++) {
                let currentCell = (row * 4) + col;
                let nextCell = currentCell + 4;
                shift(cells[currentCell], cells[nextCell]);
            }
        }
        collided = false;
    }
}
function moveDown() {
    for (let col = 0; col < 4; col++) {
        for (let i = 0; i < 3; i++) {
            for (let row = 3; row > 0; row--) {
                let currentCell = (row * 4) + col;
                let nextCell = currentCell - 4;
                shift(cells[currentCell], cells[nextCell]);
            }
        }
        collided = false;
    }
}
spawn();