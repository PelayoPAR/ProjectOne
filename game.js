class Game {
  constructor(numberOfCows, numberOfUFOs) {
    this.background = new Background();
    this.numberOfUFOs = numberOfUFOs;

    // this.cow = new Cow(); <- for single cow object
    this.cowHerd = [];
    // takes numberofCows from game constructor and makes them all appear at once.
    for (let i = 0; i < numberOfCows; i++) {
      const moonWalkDice = Math.floor(Math.random() * 2) >= 1;
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.cowHerd.push(new Cow(randomX, CANVAS_HEIGHT - 100, i, moonWalkDice));
    }

    // this.ufo = new Ufo(); <- for single UFO object
    // takes numberofUFOs from game constructor
    this.ufoHerd = [];

    // this makes UFOs appear all at once:
    // for (let i = 0; i < numberOfUFOs; i++) {
    //   const randomX = Math.floor(Math.random() * 1750 + 50);
    //   this.ufoHerd.push(new Ufo(randomX, 0 - 100, i));
    // }

    this.player = new Player();
    this.finalScore = 0;
    this.UFOcounter = 0;
  }

  preload() {
    // pending changing load order so that player goes in top of the cows
    playerImg = this.player.preload();
    this.background.preload();
    // this.ufo.preload(); <- fir single UFO object
    cowImg = loadImage("images/cow_002.svg");
    cowImgFlipped = loadImage("images/cow_002Flipped.svg");
    ufoImg = loadImage("images/separateUFO2ndModel.svg");
    gifLoadUFOXplosion = loadImage("images/explosionCool.gif");
  }

  play() {
    this.background.drawBackground();
    // console.log(game.ufoHerd);

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
      const randomX = Math.floor(Math.random() * (CANVAS_WIDTH - 150));
      this.ufoHerd.push(new Ufo(randomX, 0 - 100));
      this.UFOcounter++;
    }

    // to detect collision between UFOs and bullets:
    this.player.bulletArray.forEach((bullet) => {
      this.ufoHerd.forEach((ufo) => {
        if (this.isColliding(bullet, ufo)) {
          if (!bullet.hasCollided) {
            // this.numberOfUFOs--; <- in case we want a simple 10 UFOs start 10 UFOs are destroyed.
            // lets spice it up with an UFO reinforcement rate with some randomness.
            const dice = Math.floor(Math.random() * 10);
            if (!ufo.hasCollided && dice >= 4) {
              this.numberOfUFOs--;
              console.log(this.numberOfUFOs);
            }
            ufo.hit();
          }
          if (ufo.boomTime >= 89) {
            bullet.hit();
          }
        }
      });
    });

    // after scanning for hits, eliminate bullets and ufos from bulletArray accordingly
    this.player.bulletArray = this.player.bulletArray.filter((bullet) => {
      return !bullet.hasCollided;
    });
    // after scanning for exploded UFOs, remove them from ufoHerd array
    const currentUFOs = this.ufoHerd.length;

    const survivingUFOs = this.ufoHerd.filter((ufo) => {
      return ufo.boomTime > 0;
    });
    this.ufoHerd = survivingUFOs;
    const killedUFOs = currentUFOs - survivingUFOs.length; // IS THIS A NUMBER EVEN???
    this.player.score += killedUFOs;
    // if (ufo.boomTime < 2) {
    //   this.player.score++;
    // }

    if (this.ufoHerd.length <= 0) {
      this.finalScore = this.player.score * 100 * this.cowHerd.length;
    }
  }

  //  in case of machine gun
  //  keyPressed() {
  //    this.player.keyPressed();
  //  }

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
