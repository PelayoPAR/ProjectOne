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
    this.abducting = false;
    this.target = undefined;
    this.speed = 3;
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
    } else if (this.top >= CANVAS_HEIGHT / 3 && !this.abducting) {
      this.ufoHorMove();
    }
    if (this.abducting) {
      this.abductio();
    }
  }
  // method to acknowledge being hit by bullet:
  hit() {
    this.hasCollided = true;
  }

  abductio() {
    if (!this.aboveTarget) {
      this.goToCow();
    } else {
      this.cowLevitatio();
    }

    // isAboveCow needs some margin to avoid UFO never reaching the exact pixel due to it not being multiple of speed.
    const margin = 2 * this.speed;
    const isAboveCow =
      this.left + this.width / 2 > this.target.left - margin &&
      this.left + this.width / 2 < this.target.left + margin;

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
    if (
      this.target.top > this.top
      // this.hasCowStowed === false
    ) {
      if (this.target.top > this.top + 15) {
        this.target.top--;
      }
    }
    // while (this.target.top < this.top + this.height) {
    //   this.target.top--;
    // }
  }
}
