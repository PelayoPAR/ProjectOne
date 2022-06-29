class Ufo {
  constructor(left, top, id) {
    this.id = id;
    this.top = top;
    this.left = left;
    this.width = 150;
    this.height = 75;
    this.initialDirection = "left";
    this.hasCollided = false;
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
    //rect(this.left, this.top, this.width, this.height);
    image(ufoImg, this.left, this.top, this.width, this.height);

    if (this.top < CANVAS_HEIGHT / 3) {
      this.top += 5;
    } else if (this.top >= CANVAS_HEIGHT / 3) {
      this.ufoHorMove();
    }
  }
  // ufoExplode(/*iscolliding = true/false*/) {}
  explodeUFO() {
    image(gifLoadUFOXplosion, this, left, this.top, this.width, this.height);
    gifCreateUFOXplosion.position(this.left, this.top);
  }

  hit() {
    // console.log("piaupiaupiau")
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
