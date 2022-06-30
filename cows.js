class Cow {
  constructor(left, top, id, moonWalk = false) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.height = 50;
    this.width = 75;
    this.initialDirection = "left";
    this.moonWalk = moonWalk; // All cows moving normally made me a bit less happy xD
  }

  moveCow() {
    // as with UFOs make them change direction when they reach canvas limits:
    const multiplier = this.initialDirection === "left" ? -1 : 1;
    this.left += 1 * multiplier;
    if (this.left < 5 && this.initialDirection === "left") {
      this.initialDirection = "right";
    } else if (
      this.left > CANVAS_WIDTH - this.width &&
      this.initialDirection === "right"
    ) {
      this.initialDirection = "left";
    }
  }

  drawCow() {
    // make cows face direction they're moving to by flipping the image (except for naturally occuring moonwalking cows):
    if (this.initialDirection === "left") {
      image(cowImg, this.left, this.top, this.width, this.height);
      this.moveCow();
    } else if (this.initialDirection === "right") {
      if (!this.moonWalk) {
        image(cowImgFlipped, this.left, this.top, this.width, this.height);
      } else {
        image(cowImg, this.left, this.top, this.width, this.height);
      }
      this.moveCow();
    }
  }
}
