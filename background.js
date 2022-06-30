class Background {
  constructor() {
    this.left = 0;
  }

  preload() {
    this.img = loadImage("images/darkFarmInDaPinos.jpg");
  }

  drawBackground() {
    image(this.img, this.left, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
