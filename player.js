class Player {
  constructor() {
    this.top = 0;
    this.left = CANVAS_WIDTH / 2 - 25;
    this.width = 50;
    this.height = 50;
    this.bulletArray = [];
  }

  preload() {
    this.img = loadImage("./images/farmer.jpg");
  }

  //trying to shoot:
  keyIsDown() {
    if (keyCode === SPACE_BAR) {
      console.log("bang");
      this.bulletBurst;
    }
  }

  bulletBurst() {
    const gunLocation = this.farmerGunLocation();
    this.bulletArray.push(new Bullet(gunLocation.top, gunLocation.left));
  }

  farmerGunLocation() {
    return {
      top: this.top,
      left: this.left,
    };
  }

  lostBullets() {
    this.bulletArray = this.bulletArray.filter(
      (bullet) => bullet.top <= CANVAS_HEIGHT
    );
  }

  drawPlayer() {
    image(
      this.img,
      this.left,
      CANVAS_HEIGHT - this.height,
      this.width,
      this.height
    );

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

    this.lostBullets();
  }
}
