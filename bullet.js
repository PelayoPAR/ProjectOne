class Bullet {
  constructor(left, top, bulletImg, bulletCount) {
    this.id = bulletCount;
    this.left = left;
    this.top = top;
    this.width = 10;
    this.height = 10;
    this.img = bulletImg;
    this.hasCollided = false;
  }

  shootBullets() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top -= 7;
  }

  hit() {
    // console.log("pam");
    this.hasCollided = true;
  }
}
