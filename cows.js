class Cow {
  constructor(left, top) {
    this.left = left;
    this.top = top;
    this.height = 50;
    this.width = 75;
    this.initialDirection = "left";
  }

  moveCow() {
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
    //rect(this.left, this.top, this.width, this.height);
    image(cowImg, this.left, this.top, this.width, this.height);
    this.moveCow();
  }
}
