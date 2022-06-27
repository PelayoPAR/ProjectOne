// main.js is the basic "entry point" of our game.
// in some programming languages you are required to have a `main` function to even start, so we created this file to simulate it.
// the general idea is that you should be able to almost copy paste the main file between your projects and the projects should behave the same

// we instantiate the game in this main file because is the only thing it should know that it exists. and then from that point every responsability gets moved to the game class
const game = new Game(10, 10);

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

// we call game.play because this main file should not care what, why, how, when something is drawn. those questions should be answered by the game, instead of the main file
function draw() {
  game.play();
}

// we call game.preload because this main file should not care what needs to be preloaded. if something is to be preloaded we tell the game to figure it out
function preload() {
  game.preload();
}

// we call game.keyPresed because this main file should not care what needs to happen when a key is pressed. let the game "orchestrate" the game behaviour
function keyPressed() {
  game.keyIsDown();
}
