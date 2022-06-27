class Player {
  constructor() {
    this.left = CANVAS_WIDTH / 2 - 25;
    this.top = CANVAS_HEIGHT;
    this.width = 100;
    this.height = 100;
    this.bulletArray = [];
  }

  preload() {
    this.img = loadImage("images/farmerWeaponized.svg");
    this.bulletImg = loadImage("images/bullet.svg");
  }

  keyIsDown() {
    if (keyCode === SPACE_BAR) {
      // console.log("bang");
      this.bulletBurst();
    }
  }

  bulletBurst() {
    const gunLocation = this.farmerGunLocation();
    this.bulletArray.push(
      new Bullet(gunLocation.left, gunLocation.top, this.bulletImg)
    );
  }

  farmerGunLocation() {
    const gunX = this.width / 2;
    const gunY = -this.height;
    return {
      left: this.left + gunX,
      top: this.top + gunY,
    };
  }

  strayBullets() {
    this.bulletArray = this.bulletArray.filter((bullet) => bullet.top >= 0);
  }

  drawPlayer() {
    image(this.img, this.left, this.top - this.height, this.width, this.height);

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

    this.bulletArray.forEach((bullet) => {
      bullet.shootBullets();
    });

    this.strayBullets();

    // if (frameCount % 50 === 0) {
    // text("You goshdarn aliens!!!", this.left + this.width + 10, this.top - 10);
    // }
  }
}
