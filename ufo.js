class Ufo {
  constructor(left, top) {
    this.top = top;
    this.left = left;
    this.width = 200;
    this.height = 150;
    this.initialDirection = "left";
    //this.isColliding = "false"
  }

  preload() {
    this.img = loadImage("images/separateUFO2ndModel.svg");
  }

  ufoHorMove = () => {
    const multiplier = this.initialDirection === "left" ? -1 : 1;
    this.left += 3 * multiplier;
    if (this.left < 5 && this.initialDirection === "left") {
      this.initialDirection = "right";
    } else if (
      this.left > CANVAS_WIDTH - this.width &&
      this.initialDirection === "right"
    ) {
      this.initialDirection = "left";
    }
  };

  drawUfo() {
    image(ufoImg, this.left, this.top, this.width, this.height);

    if (this.top < CANVAS_HEIGHT / 3) {
      this.top += 5;
    } else if (this.top >= CANVAS_HEIGHT / 3) {
      this.ufoHorMove();
    }
  }
  // ufoExplode(/*iscolliding = true/false*/) {}

  Abductio() /* perhaps introduce unluckyCow and abductingUFO as parameters?? */ {
    //choose abductingUFO and unluckyCow from respective arrays
    let unluckyCow =
      game.cowHerd[Math.floor(Math.random() * game.cowHerd.length)]; // not sure if cowHerd will work like this or just cowHerd

    let abductingUFO =
      game.ufoHerd[Math.floor(Math.random() * game.ufoHerd.length)];

    // AbductingUFO must move towards unluckyCow and beam it up (easier said than done innit?)
  }
}
