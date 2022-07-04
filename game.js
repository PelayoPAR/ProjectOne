class Game {
  constructor(numberOfCows, numberOfUFOs) {
    this.background = new Background();
    // takes numberofUFOs from game constructor
    this.numberOfUFOs = numberOfUFOs;

    // this.cow = new Cow(); <- for single cow object
    this.cowHerd = [];
    // takes numberofCows from game constructor and makes them all appear at once at the beginning of the game.
    for (let i = 0; i < numberOfCows; i++) {
      const moonWalkDice = Math.floor(Math.random() * 2) >= 1; // <- the >= 1 turns it into boolean for easier management.
      const randomX = Math.floor(Math.random() * 1750 + 50);
      this.cowHerd.push(new Cow(randomX, cowFloor, i, moonWalkDice));
    }

    // this.ufo = new Ufo(); <- for single UFO object
    this.ufoHerd = []; // <- for UFO array

    // this makes UFOs appear all at once:
    // for (let i = 0; i < numberOfUFOs; i++) {
    //   const randomX = Math.floor(Math.random() * 1750 + 50);
    //   this.ufoHerd.push(new Ufo(randomX, 0 - 100, i));
    // }

    this.player = new Player();
    this.finalScore = 0;
    this.UFOcounter = 0; //equivalent to game.player.score
    this.gameOverCounter = 300;
  }

  preload() {
    playerImg = this.player.preload();
    this.background.preload();
    // this.ufo.preload(); <- for single UFO object
    cowImg = loadImage("images/cow_002.svg");
    cowImgFlipped = loadImage("images/cow_002Flipped.svg");
    ufoImg = loadImage("images/separateUFO2ndModel.svg"); // <- svg UFO image
    gifLoadUFOXplosion = loadImage("images/explosionCool.gif");
    // gifLoadUFO = loadImage("images/ufoMitPassengerGIF.gif"); //<- gif UFO image
    abductingHalo = loadImage("images/ufoHaloScale.svg");
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

    // drawing player after cows draws player in front of cows (z index)
    this.player.drawPlayer();

    // in order for UFOs to appear one by one each second:
    if (frameCount % 60 === 0 && this.ufoHerd.length < this.numberOfUFOs) {
      const randomX = Math.floor(Math.random() * (CANVAS_WIDTH - 150));
      this.ufoHerd.push(new Ufo(randomX, 0 - 100, frameCount / 60));
      this.UFOcounter++; // <- in order to keep track of score
    }

    // to detect collision between UFOs and bullets:
    this.player.bulletArray.forEach((bullet) => {
      this.ufoHerd.forEach((ufo) => {
        if (this.isColliding(bullet, ufo)) {
          // we need to remove bullet and make ufo pass to exploding state but, all while allowing UFOs that are "behind" to be hittable by other bullets
          // that is, avoid that the explosion absorb bullets:
          if (!bullet.hasCollided) {
            // this.numberOfUFOs--; <- in case we want a simple 10 UFOs start 10 UFOs are destroyed.
            // but, lets spice it up with an UFO reinforcement rate with some randomness.
            const dice = Math.floor(Math.random() * 10);
            if (!ufo.hasCollided && dice >= 4) {
              this.numberOfUFOs--;
              // console.log(this.numberOfUFOs); //cheat code to know if the killed UFO has been deducted from ufoHerd array.
            }
            // important! ufo.hit() must be run here below to avoid hit duplication
            ufo.hit();
          }
          //important! ufo.boomTime is initially set to 90 frames countdown,
          // it's important that it is accounted for 1 frame after hit in order to avoid hit duplication while still allowing bullets to go through explosions:
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
    // after scanning for exploded UFOs, remove them from ufoHerd array and keep track of score
    const currentUFOs = this.ufoHerd.length; // <- this number will have killedUFOs substracted to keep track of score

    // return only unscathed UFOs.
    const survivingUFOs = this.ufoHerd.filter((ufo) => {
      return ufo.boomTime > 0;
    });

    // if a cow has been completely abducted, remove it from cowHerd
    this.cowHerd = this.cowHerd.filter((cow) => {
      return !cow.stowedOnUFO;
    });

    //call abductioEvent() in some random (but somewhat limited) way that still makes sense for the gameplay:
    const abductioDice = Math.floor(Math.random() * 10);
    if (frameCount > 540 && frameCount % 120 === 0 && abductioDice >= 4) {
      this.abductioEvent();
    }

    //Redeclare ufoHerd in order to update it and remove UFOs that have been hit:
    this.ufoHerd = survivingUFOs;
    const killedUFOs = currentUFOs - survivingUFOs.length; // here we substract survivingUFOs (after filter) to previous UFOs (currentUFOs) to keep track of score.
    this.player.score += killedUFOs; // we keep adding destroyed UFOs to the player score

    // Once the fog of war has settled, count killedUFOs * 100 points and multiply by surviving cows
    if (this.ufoHerd.length <= 0) {
      this.finalScore = this.player.score * 100 * this.cowHerd.length;
    }

    //display score:
    this.scoreDraw();

    if (this.gameOverCounter < -1200) {
      this.gameOverCounter = 1;
    }
  }

  // break glass in case of machine gun powerup
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

  abductioEvent() {
    const cowsNotAbducted = this.cowHerd.filter((cow) => !cow.abducted); //we need to work with filtered array as explained below
    if (!cowsNotAbducted.length) return; // this line avoids errors when calling AbductioEvent() when there are no cows left.
    const unluckyCow =
      cowsNotAbducted[Math.floor(Math.random() * cowsNotAbducted.length)]; // filtered in order to avoid choosing same cow twice

    const ufosNotAbducting = this.ufoHerd.filter((ufo) => !ufo.abducting); // similar case as with cows
    if (!ufosNotAbducting.length) return;
    const abductingUFO =
      ufosNotAbducting[Math.floor(Math.random() * ufosNotAbducting.length)]; // similar case as with cows

    // first, make cow and UFO stop
    abductingUFO.abducting = true;
    unluckyCow.abducted = true;

    // provide target for UFO:
    abductingUFO.target = unluckyCow; // passing cow by reference. Keep in mind: if it's changed wherever it'll change everywhere
  }

  scoreDraw() {
    let score = this.player.score * 100;
    if (this.ufoHerd <= 0) {
      this.gameOverCounter--;
      if (this.ufoHerd <= 0 && this.gameOverCounter <= 0)
        text(this.finalScore, CANVAS_WIDTH - 200, 50, 50, 50);
      textFont("Orbitron");
    } else {
      text(score, CANVAS_WIDTH - 200, 50, 50, 50);
      textFont("Orbitron");
    }
  }
}
