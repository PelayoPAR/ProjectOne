class Bullet {
  constructor(top, left) {
    this.top = top;
    this.left = left;
  }

  shootBullets() {
    textSize(10);
    text("O", this.left, this.top);
    this.top -= 1;
  }
}
