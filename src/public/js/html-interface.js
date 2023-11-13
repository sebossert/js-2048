const cells = document.getElementsByClassName('number');
const scoreField = document.getElementById('score');
let blockInput = false;
const moveFunctions = {
    'ArrowLeft': game.moveLeft.bind(game),
    'ArrowRight': game.moveRight.bind(game),
    'ArrowUp': game.moveUp.bind(game),
    'ArrowDown': game.moveDown.bind(game)
};
document.getElementById('restart').addEventListener(
    'click',
    (event) => {
        console.dir(event);
        game.reset();
        game.spawn();
        updateHtml(game, cells, scoreField);
        blockInput = false;
    }
)
document.addEventListener(
    "keydown",
    (event) => {
        if(blockInput) {
        //return;
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
    console.dir('processMove' + keyName)
    let direction = false;
    direction = keyName.substr(5).toLowerCase();
    animateMove(direction);
}

function animateMove(direction) {
    for(let i = 0; i < game.moved.length; i++) {
        const cell = game.moved[i];
        cells[cell].classList.add(direction);
    }
    setTimeout(() => {
        wipeClass(direction);
        updateHtml(game, cells, scoreField);
        blockInput = false;
    }, 200);
}

function wipeClass(className) {
    const cellsToWipe = document.getElementsByClassName(className);
    while(cellsToWipe.length) {
        cellsToWipe[0].classList.remove(className);
    }
}

function updateHtml(game, cells, scoreField) {
    updateCells(cells, game.cells);
    scoreField.innerHTML = game.score;
}

function updateCells(htmlCells, gameCells){
    for(let i = 0; i < gameCells.length; i++) {
        htmlCells[i].parentElement.classList.remove('n-' + htmlCells[i].innerHTML);
        htmlCells[i].innerHTML = gameCells[i] === 0 ? '' : gameCells[i];
        htmlCells[i].parentElement.classList.add('n-' + gameCells[i]);
    }
}

game.spawn();
updateHtml(game, cells, scoreField);