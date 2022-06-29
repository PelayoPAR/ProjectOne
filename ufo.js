class Ufo {
  constructor(left, top, id) {
    this.id = id;
    this.top = top;
    this.left = left;
    this.width = 150;
    this.height = 75;
    this.initialDirection = "left";
    this.hasCollided = false;
    this.boomTime = 90; //<- in frames
  }

  preload() {
    this.img = loadImage("images/separateUFO2ndModel.svg");
  }

  ufoHorMove = () => {
    // ternary to define left or right
    const multiplier = this.initialDirection === "left" ? -1 : 1;
    // define UFO horizontal speed here:
    this.left += 3 * multiplier;
    // for explosions to leave canvas instead of bouncing on the edge:
    if (!this.hasCollided) {
      // here is the change of direction:
      if (this.left < 5 && this.initialDirection === "left") {
        this.initialDirection = "right";
      } else if (
        this.left > CANVAS_WIDTH - this.width &&
        this.initialDirection === "right"
      ) {
        this.initialDirection = "left";
      }
    }
  };

  drawUfo() {
    //rect(this.left, this.top, this.width, this.height);
    if (this.hasCollided) {
      image(gifLoadUFOXplosion, this.left, this.top, this.width, this.height);
      this.boomTime--;
    } else {
      image(ufoImg, this.left, this.top, this.width, this.height);
    }

    if (this.top < CANVAS_HEIGHT / 3) {
      this.top += 5;
    } else if (this.top >= CANVAS_HEIGHT / 3) {
      this.ufoHorMove();
    }
  }
  hit() {
    this.hasCollided = true;
  }

  Abductio() /* perhaps introduce unluckyCow and abductingUFO as parameters?? */ {
    //choose abductingUFO and unluckyCow from respective arrays
    let unluckyCow =
      game.cowHerd[Math.floor(Math.random() * game.cowHerd.length)]; // not sure if cowHerd will work like this or just cowHerd

    let abductingUFO =
      game.ufoHerd[Math.floor(Math.random() * game.ufoHerd.length)];

    // AbductingUFO  - must move towards unluckyCow and? - beam it up (easier said than done innit?)
    // first, make cow and UFO stop

    //then make cow move up towards UFO
  }
}
