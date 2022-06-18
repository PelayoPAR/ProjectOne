class Player {
  constructor() {
    this.top = 0;
    this.left = 0;
    this.width = 50;
    this.height = 50;
  }

  preload() {
    this.img = loadImage("./images/farmer.jpg");
  }

  drawPlayer() {
    image(this.img, this.left, 450, 50, 50);

    // movement L-R implemented here for smooth movement:
    if (keyIsDown(ARROW_LEFT)) {
      if (this.left > 0) {
        this.left -= 4;
      }
    }
    if (keyIsDown(ARROW_RIGHT)) {
      if (this.left < CANVAS_WIDTH - this.width) {
        this.left += 4;
      }
    }
  }

  // future implementation of fire button pending
  keyIsDown() {}
}
