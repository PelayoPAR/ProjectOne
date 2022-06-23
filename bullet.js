class Bullet {
  constructor(left, top, bulletImg) {
    this.left = left;
    this.top = top;
    this.img = bulletImg;
  }

  shootBullets() {
    textSize(10);
    image(this.img, this.left, this.top, 10, 10);
    this.top -= 7;
  }
}
