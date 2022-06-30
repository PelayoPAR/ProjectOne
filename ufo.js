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
  }

  preload() {
    // this.img = loadImage("images/separateUFO2ndModel.svg");
    // this.img = loadImage("images/ufoGIF.gif");
  }

  ufoHorMove = () => {
    // ternary to define if left or right
    const multiplier = this.direction === "left" ? -1 : 1;
    // define UFO horizontal speed here:
    this.left += 3 * multiplier;
    // for explosions to leave canvas instead of bouncing on the edge:
    if (!this.hasCollided) {
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
      image(ufoImg, this.left, this.top, this.width, this.height);
    }
    // UFO drops until certain height then starts horizontal movement:
    if (this.top < CANVAS_HEIGHT / 3) {
      this.top += 5;
    } else if (this.top >= CANVAS_HEIGHT / 3 && !this.abducting) {
      this.ufoHorMove();
    }
    if (this.abducting) {
      // this.abductio();
    }
  }
  // method to acknowledge being hit by bullet:
  hit() {
    this.hasCollided = true;
  }

  abductio() /* perhaps introduce unluckyCow(this.target) and abductingUFO as parameters?? */ {
    //choose abductingUFO and unluckyCow(this.target) from respective arrays

    //then make UFO move horizontally towards cow:
    if (this.left > this.target.left) {
      console.log("goLeft");
      this.direction = "left";
      this.ufoHorMove();
    } else if (this.left < this.target.left) {
      console.log("goRight");
      this.direction = "right";
      this.ufoHorMove();
    }

    //then make cow move up towards UFO
    if (this.target.top < this.top + this.height) {
      this.target.top -= this.target.top;
    }
  }
}
