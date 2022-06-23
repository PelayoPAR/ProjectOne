class Ufo {
  constructor() {
    this.top = 0;
    this.left = CANVAS_WIDTH / 2 - 50;
    this.width = 100;
    this.height = 100;
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
    image(this.img, this.left, this.top, this.width, this.height);

    // var countdownStart = random(60, 720);
    // setInterval??

    //let UfoHorInterval = setInterval(ufoHorMove(),1500)

    if (this.top < CANVAS_HEIGHT / 2.5 + this.height) {
      this.top += 5;
    } else if (this.top >= CANVAS_HEIGHT / 2.5 + this.height) {
      this.ufoHorMove();
    }
  }
  
  ufoExplode(/*iscolliding = true/false*/) {
    
  }
}
