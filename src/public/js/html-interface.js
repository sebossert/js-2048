const cells = document.getElementsByClassName('number');
let blockInput = false;
const moveFunctions = {
    'ArrowLeft': game.moveLeft.bind(game),
    'ArrowRight': game.moveRight.bind(game),
    'ArrowUp': game.moveUp.bind(game),
    'ArrowDown': game.moveDown.bind(game)
};
const isCellMoveable = {
    'left': function(cellNumber) { return cellNumber % 4 !== 0; },
    'right': function(cellNumber) { return (cellNumber + 1) % 4 !== 0; },
    'up': function(cellNumber) { return cellNumber > 3; },
    'down': function(cellNumber) { return cellNumber < 12 }
}

document.addEventListener(
    "keydown",
    (event) => {
        if(blockInput) {
            return;
        }
        blockInput = true;
        const keyName = event.key;
        if (moveFunctions.hasOwnProperty(keyName)) {
            moveFunctions[keyName]();
            processMove(keyName);
        }
    },
    false
);

function processMove(keyName) {
    let direction = false;
    if(keyName) {
        direction = keyName.substr(5).toLowerCase();
        animateMove(direction);
    }
    else {
        updateHtml(cells, game.cells);
    }
}

function animateMove(direction) {
    if(!direction) {
        return;
    }
    for(let i = 0; i < 16; i++) {
        if(cells[i].innerHTML && isCellMoveable[direction](i)) {
            cells[i].classList.add(direction);
        }
    }
    setTimeout(() => {
        wipeClass(direction);
        updateHtml(cells, game.cells);
        blockInput = false;
    }, 250);
}

function wipeClass(className) {
    let cells = document.getElementsByClassName(className);
    while(cells.length) {
        cells[0].classList.remove(className);
    }
}

function updateHtml(htmlCells, logicCells) {
    for(let i = 0; i < logicCells.length; i++) {
        htmlCells[i].innerHTML = logicCells[i] === 0 ? '' : logicCells[i];
    }
}

game.spawn();
updateHtml(cells, game.cells);