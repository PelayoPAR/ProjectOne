class Bullet {
  constructor(left, top, bulletImg) {
    this.left = left;
    this.top = top;
    this.width = 10;
    this.height = 10;
    this.img = bulletImg;
  }

  shootBullets() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top -= 7;
  }
}
