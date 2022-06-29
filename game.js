class Game {
  constructor(numberOfCows, numberOfUFOs) {
    this.background = new Background();
    this.numberOfUFOs = numberOfUFOs;
    // this.ufo = new Ufo(); <- for single UFO object
    // takes numberofUFOs from game constructor -- *** pending framecount dependancy to appear at some defined rate.
    this.ufoHerd = [];

    // this makes UFOs appear all at once:
    // for (let i = 0; i < numberOfUFOs; i++) {
    //   const randomX = Math.floor(Math.random() * 1750 + 50);
    //   this.ufoHerd.push(new Ufo(randomX, 0 - 100, i));
    // }

    // this.cow = new Cow(); <- for single cow object
    this.cowHerd = [];
    // takes numberofCows from game constructor and makes them all appear at once.
    for (let i = 0; i < numberOfCows; i++) {
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.cowHerd.push(new Cow(randomX, CANVAS_HEIGHT - 100, i));
    }
    this.player = new Player();
  }

  preload() {
    // pending changing load order so that player goes in top of the cows
    playerImg = this.player.preload();
    this.background.preload();
    // this.ufo.preload(); <- fir single UFO object
    cowImg = loadImage("images/cow_002.svg");
    ufoImg = loadImage("images/separateUFO2ndModel.svg");
    gifLoadUFOXplosion = loadImage("images/explosionCool.gif");
  }

  play() {
    this.background.drawBackground();

    // this.ufo.drawUfo(); <- for single UFO object
    this.ufoHerd.forEach((ufo) => {
      ufo.drawUfo();
    });
    this.cowHerd.forEach((cow) => {
      cow.drawCow();
    });
    this.player.drawPlayer();

    // in order for UFOs to appear one by one each second:
    if (frameCount % 60 === 0 && this.ufoHerd.length < this.numberOfUFOs) {
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.ufoHerd.push(new Ufo(randomX, 0 - 100));
    }

    // to detect collision between UFOs and bullets:
    this.player.bulletArray.forEach((bullet) => {
      this.ufoHerd.forEach((ufo) => {
        if (this.isColliding(bullet, ufo)) {
          if (!bullet.hasCollided) {
            ufo.hit();

            // this.numberOfUFOs--; <- in case we want a simple 10 UFOs start 10 UFOs are destroyed.
            // lets spice up the UFO reinforcement rate with some randomness.
            const dice = Math.floor(Math.random() * 10);
            if (dice >= 4) {
              this.numberOfUFOs--;
              // this.player.score++;
            }
          }
          bullet.hit();

          // console.log("crack, zas, pow!");
        }
      });
    });

    // after scanning for hits, eliminate bullets and ufos from bulletArray accordingly
    this.player.bulletArray = this.player.bulletArray.filter((bullet) => {
      return !bullet.hasCollided;
    });
    // after scanning for exploded UFOs, remove them from ufoHerd array
    this.ufoHerd = this.ufoHerd.filter((ufo) => {
      return ufo.boomTime > 0;
    });

    // try to make the farmer say funny/dumb stuff:
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
    // ***** pending detection once instead of continuous detection
    // collisionOccurred = false
    // if (!collisonOccurred) {}

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
