class Ufo {
  constructor(left, top, id) {
    this.id = id;
    this.top = top;
    this.left = left;
    this.width = 150;
    this.height = 75;
    this.direction = "left";
    this.hasCollided = false; //<- has it collided with a bullet? Y/N
    this.boomTime = 90; //<- in frames
    this.speed = 3;
    this.abducting = false;
    this.target = undefined;
    this.aboveTarget = false;
    this.hasCowStowed = false;
    this.chasingCow = false;
  }

  preload() {
    // this.img = loadImage("images/separateUFO2ndModel.svg");
    // this.img = loadImage("images/ufoGIF.gif");
  }

  ufoHorMove = () => {
    // ternary to define if left or right
    const multiplier = this.direction === "left" ? -1 : 1;
    // define UFO horizontal speed here:
    this.left += this.speed * multiplier;
    // for explosions to leave canvas instead of bouncing on the edge:
    if (!this.hasCollided || !this.chasingCow) {
      // here is the change of direction: if reaching edge of canvas and going on a direction, change direction
      if (this.left < 5 && this.direction === "left") {
        this.direction = "right";
      } else if (
        this.left > CANVAS_WIDTH - this.width &&
        this.direction === "right"
      ) {
        this.direction = "left";
      }
    }
  };

  drawUfo() {
    //rect(this.left, this.top, this.width, this.height);
    // if hit by bullet, make explosion, else, draw UFO:
    if (this.hasCollided) {
      image(gifLoadUFOXplosion, this.left, this.top, this.width, this.height);
      this.boomTime--;
    } else {
      if (this.aboveTarget) {
        image(
          abductingHalo,
          this.left,
          this.top - 2 * this.height,
          this.width,
          750
        );
      }
      image(ufoImg, this.left, this.top, this.width, this.height);
      // if (this.aboveTarget) {
      //   image(abductingHalo, this.left, this.top + this.height, 500, this.width);
      // }
    }

    // UFO drops until certain height then starts horizontal movement:
    if (this.top < CANVAS_HEIGHT / 3) {
      this.top += 5;
      // had to exclude when abducting in order to be able to initiate this.abductio() below:
    } else if (this.top >= CANVAS_HEIGHT / 3 && !this.abducting) {
      this.ufoHorMove();
    }
    // this.abducting initiates abduction after being updated by game.abductioEvent():
    if (this.abducting) {
      this.abductio();
    }
  }

  // method to acknowledge being hit by bullet:
  hit() {
    this.hasCollided = true;
  }

  //if UFO is not above the cow, position UFO on top of cow. Once on top, move the cow towards UFO
  abductio() {
    if (!this.aboveTarget) {
      this.goToCow();
    } else {
      if (!this.hasCollided) {
        this.cowLevitatio();
      }
      if (this.hasCollided) {
        this.cowGravitatio();
      }
    }

    // isAboveCow needs some margin to avoid UFO never reaching the exact pixel due to the exact pixel not being multiple of speed.
    const margin = 2 * this.speed;
    // So isAboveCow is a more or less wide space where the UFO will jump to position above the cow. This is to avoid a bug where the UFO would never reach the exact position
    const isAboveCow =
      this.left + this.width / 2 > this.target.left - margin &&
      this.left + this.width / 2 < this.target.left + margin;

    //if on top of cow and UFO is in abducting status, jump to position and update aboveTarget status
    if (isAboveCow) {
      if (this.abducting) {
        this.left = this.target.left - this.target.width / 2;
        this.aboveTarget = true;
      }
    }
  }

  //then make UFO move horizontally towards cow:
  // "this.target.width / 2" makes the UFO center above the cow.
  goToCow() {
    this.ufoHorMove();
    if (this.chasingCow) return;
    if (this.left + this.target.width / 2 > this.target.left) {
      this.direction = "left";
    } else if (this.left - this.target.width / 2 < this.target.left) {
      this.direction = "right";
    }
    this.chasingCow = true;
  }

  // then make cow move up towards UFO
  cowLevitatio() {
    if (this.target.top > this.top) {
      if (this.target.top > this.top + 15) {
        this.target.top--;
      }
      if (this.target.top <= this.top + 15) {
        // once unluckyCow.stowedOnUFO is true, game.js-play() will filter the cowHerd array to remove said UnluckyCow:
        this.target.stowedOnUFO = true;
        // UFO should go back to initial state cuz they greedy and want moar cows.
        this.abducting = false;
        this.aboveTarget = false;
      }
    }
  }
  // If the UFO is destroyed while tractor beaming the cow up, the cow should go back down to the floor and go back to its cow business as usual.
  cowGravitatio() {
    if (this.target.top < this.target.cowFloor) {
      this.target.top += 7;
      this.target.abducted = false; // due to the amazing power of OOP, this simple reassignment makes the cow revert back to original status (expcept some bug proving otherwise)
    }
  }
}
