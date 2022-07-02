class Cow {
  constructor(left, top, id, moonWalk = false) {
    //moonWalk = false is parameter default value
    this.id = id;
    this.left = left;
    this.top = top;
    this.cowFloor = top;
    this.height = 50;
    this.width = 75;
    this.speed = 1;
    this.direction = "left";
    this.moonWalk = moonWalk; // Having all cows moving forward normally made me a bit less happy xD
    this.abducted = false;
    this.stowedOnUFO = false;
  }

  moveCow() {
    // as with UFOs make them change direction when they reach canvas limits:
    const multiplier = this.direction === "left" ? -1 : 1;
    if (!this.abducted) {
      this.left += this.speed * multiplier;
    }
    if (this.left < 75 && this.direction === "left") {
      this.direction = "right";
    } else if (
      this.left > CANVAS_WIDTH - this.width - 75 &&
      this.direction === "right"
    ) {
      this.direction = "left";
    }
  }

  drawCow() {
    // make cow's image face direction they're moving to by flipping the image (except for random naturally occuring moonwalking cows):
    if (this.direction === "left") {
      image(cowImg, this.left, this.top, this.width, this.height);
      this.moveCow();
    } else if (this.direction === "right") {
      if (!this.moonWalk) {
        image(cowImgFlipped, this.left, this.top, this.width, this.height);
      } else {
        image(cowImg, this.left, this.top, this.width, this.height);
      }
      this.moveCow();
    }
  }
}
