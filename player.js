class Player {
  constructor() {
    this.left = CANVAS_WIDTH / 2 - 25;
    this.top = CANVAS_HEIGHT;
    this.width = 100;
    this.height = 100;
    this.bulletArray = [];
    this.bulletCount = 0;
    this.score = 0; // after counting killed UFOs * 100 points, multiply by cowsSaved(cowHerd.length). ***PENDING: show score somewhere... */
    this.commentDurationCount = 180; // <- fps
    this.timeToComment = 180;
    this.speed = 4;
    this.allowedBurst = 3;
  }

  preload() {
    this.img = loadImage("images/farmerWeaponized.svg");
    this.bulletImg = loadImage("images/bullet.svg");
  }

  keyIsDown() {
    if (keyCode === SPACE_BAR) {
      this.bulletBurst();
    }
  }

  bulletBurst() {
    const gunLocation = this.farmerGunLocation();
    // limit ROF to 3 bullets on screen:
    if (this.bulletArray.length < this.allowedBurst && frameCount > 480) {
      this.bulletArray.push(
        new Bullet(
          gunLocation.left,
          gunLocation.top,
          this.bulletImg,
          this.bulletCount
        )
      );
      this.bulletCount++;
    }
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
        this.left -= this.speed;
      }
    }
    if (keyIsDown(ARROW_RIGHT)) {
      if (this.left < CANVAS_WIDTH - this.width) {
        this.left += this.speed;
      }
    }

    this.bulletArray.forEach((bullet) => {
      bullet.shootBullets();
    });

    this.strayBullets();

    // if timeToComment > 0 - introduce counter
    // if count % array.length === 0 - esto hace que elija un elemento del array de forma ciclica
    if (this.timeToComment > 0) {
      this.timeToComment--;
    }
    if (this.timeToComment <= 0) {
      while (this.commentDurationCount > 0) {
        this.commentOutLoud();
      }
      if (this.commentDurationCount <= 0) {
        // this.timeToComment = 180;
      }
      // this.timeToComment = 180;
    }
  }

  commentOutLoud() {
    text(
      "You goshdarn aliens!!!",
      this.left + this.width,
      this.top - this.height - 80,
      300,
      200
    );
    textSize(30);
    fill("white");
    this.commentDurationCount--;

    /*Otras frases:
    I'll show you intergalactic rustlers what's what!
    They took our jobs! And our cows! 
    We'll build a wall to keep y'all out! 
    I'm protected by God and the 2nd ammendment!
    Get off mah propertah! 
    These aliens sure are illegal!*/
  }
}
