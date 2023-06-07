var game = require('../src/public/js/game.js');

test("game.spawn", () => {
    game.reset();
    let before = 0;
    let after = 0;
    for(let i = 0; i < game.cells.length; i++) {
        before += game.cells[i];
    }
    game.spawn();
    for(let i = 0; i < game.cells.length; i++) {
        after += game.cells[i];
    }
    expect(after - before).toBeGreaterThanOrEqual(2);
    expect(after - before).toBeLessThanOrEqual(4);
});

test("game.moveLeft", () => {
    game.reset();
    game.cells[0] = 2;
    game.cells[1] = 2;
    game.moveLeft();
    expect(game.cells[0]).toEqual(4);
    expect(game.cells[1]).toEqual(0);
});
test("game.moveRight", () => {
    game.reset();
    game.cells[5] = 2;
    game.cells[6] = 2;
    game.moveRight();
    expect(game.cells[5]).toEqual(0);
    expect(game.cells[6]).toEqual(0);
    expect(game.cells[7]).toEqual(4);
});
test("game.moveUp", () => {
    game.reset();
    game.cells[0] = 2;
    game.cells[4] = 2;
    game.moveUp();
    expect(game.cells[0]).toEqual(4);
    expect(game.cells[4]).toEqual(0);
});
test("game.moveDown", () => {
    game.reset();
    game.cells[5] = 2;
    game.cells[9] = 2;
    game.cells[13] = 2;
    game.moveDown();
    expect(game.cells[9]).toEqual(2);
    expect(game.cells[13]).toEqual(4);
});
test("game.getFreeCells", () => {
    game.reset();
    expect(game.getFreeCells().length).toEqual(16);
    game.spawn();
    expect(game.getFreeCells().length).toEqual(15);
    game.spawn();
    game.spawn();
    expect(game.getFreeCells().length).toEqual(13);
});
test("game.shift", () => {
    game.reset();
    game.cells[0] = 2;
    game.cells[1] = 4;
    game.cells[2] = 4;
    game.shift(0, 1);
    expect(game.cells[0]).toEqual(2);
    expect(game.cells[1]).toEqual(4);
    game.shift(1, 2);
    expect(game.cells[1]).toEqual(8);
    expect(game.cells[2]).toEqual(0);
});