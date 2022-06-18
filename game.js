class Game {
  constructor() {
    this.player = new Player();
    this.background = new Background();
  }

  preload() {
    this.player.preload();
    this.background.preload();
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();
  }

  //   keyPressed() {
  //      this.player.keyPressed();
  //   }

  // future implementation of fire button pending
  keyIsDown() {
    this.player.keyIsDown();
  }
}
