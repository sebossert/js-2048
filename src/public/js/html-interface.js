const cells = document.getElementsByClassName('cell');
const moveFunctions = {
    'ArrowLeft': game.moveLeft.bind(game),
    'ArrowRight': game.moveRight.bind(game),
    'ArrowUp': game.moveUp.bind(game),
    'ArrowDown': game.moveDown.bind(game)
};
document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        if (moveFunctions.hasOwnProperty(keyName)) {
            moveFunctions[keyName]();
            updateHtml(cells, game.cells);
        }
    },
    false
);
function updateHtml(htmlCells, logicCells) {
    for(let i = 0; i < logicCells.length; i++) {
        htmlCells[i].innerHTML = logicCells[i] === 0 ? '' : logicCells[i];
    }
}
game.spawn();
updateHtml(cells, game.cells);