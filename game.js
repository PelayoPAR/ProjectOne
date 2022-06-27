class Game {
  constructor(numberOfCows, numberOfUFOs) {
    this.player = new Player();
    this.background = new Background();
    // this.ufo = new Ufo(); <- for single UFO object

    this.ufoHerd = [];
    // takes numberofUFOs from game constructor -- pending framecount dependancy to appear in some order.
    for (let i = 0; i <= numberOfUFOs; i++) {
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.ufoHerd.push(new Ufo(randomX, 0 - 100));
    }
    // this.cow = new Cow(); <- for single cow object
    this.cowHerd = [];
    // takes numberofCows from game constructor and makes them all appear at once.
    for (let i = 0; i <= numberOfCows; i++) {
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.cowHerd.push(new Cow(randomX, CANVAS_HEIGHT - 100));
    }
  }

  preload() {
    // pending changing load order so that player goes in top of the cows
    playerImg = this.player.preload();
    this.background.preload();
    // this.ufo.preload();
    cowImg = loadImage("images/cow_002.svg");
    ufoImg = loadImage("images/separateUFO2ndModel.svg");
  }

  play() {
    this.background.drawBackground();
    this.player.drawPlayer();
    // this.ufo.drawUfo(); <- for single UFO object
    this.ufoHerd.forEach((ufo) => {
      ufo.drawUfo();
    });

    this.cowHerd.forEach((cow) => {
      cow.drawCow();
    });

    this.player.bulletArray.forEach((bullet) => {
      this.ufoHerd.forEach((ufo) => {
        if (this.isColliding(bullet, ufo)) {
          // this.player.bulletArray.slice(bullet)
          // this.ufoHerd.slice(ufo)
          // this.ufo = new Explosion();
          console.log("crack, zas, pow!");
          // this.player.score++;
        }
      });
    });
  }

  //   keyPressed() {
  //      this.player.keyPressed();
  //   }

  keyIsDown() {
    this.player.keyIsDown();
  }

  isColliding(bullet, ufo) {
    // we want to check wether the bullet it colliding with the ufo
    // conditions for true collision
    // Bottom of A >= Top of B
    // Top of A <= Bottom of B
    // Left of A <= Right of B
    // Right of A >= Left of B

    // for sake of argument, lets say bullet is A and ufo is B

    const bottomOfA = bullet.top + bullet.height;
    const topOfB = ufo.top;
    const isBottomOfABiggerThenTopOfB = bottomOfA > topOfB;

    const topOfA = bullet.top;
    const bottomOfB = ufo.height + ufo.top;

    const isTopOfASmallerThanBottomOfB = topOfA <= bottomOfB;

    const leftOfA = bullet.left;
    const rightOfB = ufo.left + ufo.width;
    const isLeftOfASmallerThanRightOfB = leftOfA <= rightOfB;

    const rightOfA = bullet.width + bullet.left;
    const leftOfB = ufo.left;
    const isRightOfABiggerThanLeftOfB = rightOfA >= leftOfB;

    return (
      isBottomOfABiggerThenTopOfB &&
      isTopOfASmallerThanBottomOfB &&
      isLeftOfASmallerThanRightOfB &&
      isRightOfABiggerThanLeftOfB
    );
  }
}
