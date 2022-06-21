class Game {
  constructor() {
    this.player = new Player();
    this.background = new Background();
    this.ufo = new Ufo();
  }

  preload() {
    this.player.preload();
    this.background.preload();
    this.ufo.preload()
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();
    this.ufo.drawUfo()
  }

  //   keyPressed() {
  //      this.player.keyPressed();
  //   }

  // future implementation of fire button pending
  keyIsDown() {
    this.player.keyIsDown();
  }
}
