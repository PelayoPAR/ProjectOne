class Game {
  constructor(numberOfCows) {
    this.player = new Player();
    this.background = new Background();
    this.ufo = new Ufo();
    // this.cow = new Cow();
    this.cowHerd = [];
    for (let i = 0; i <= numberOfCows; i++) {
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.cowHerd.push(new Cow(randomX, CANVAS_HEIGHT - 100));
    }
  }

  preload() {
    this.player.preload();
    this.background.preload();
    this.ufo.preload();
    cowImg = loadImage("images/cow_002.svg");
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();
    this.ufo.drawUfo();
    this.cowHerd.forEach((cow) => {
      cow.drawCow();
    });
  }

  //   keyPressed() {
  //      this.player.keyPressed();
  //   }

  keyIsDown() {
    this.player.keyIsDown();
  }
}
