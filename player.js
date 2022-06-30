class Player {
  constructor() {
    this.left = CANVAS_WIDTH / 2 - 25;
    this.top = CANVAS_HEIGHT;
    this.width = 100;
    this.height = 100;
    this.bulletArray = [];
    this.bulletCount = 0;
    this.score = 0; /* pending score to be UFOs destroyed * cowsSaved(cowHerd.length) also show score somewhere... */
    this.commentDurationCount = 180; // <- fps
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
    // limit ROF to 3:
    if (this.bulletArray.length < 3) {
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

    // if chatTime > 0 - meter contador
    // if count % array.length === 0 - esto hace que elija un elemento del array de forma ciclica
    this.commentOutLoud();
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
    We'll build a wall to keep you out! 
    I'm protected by God and the 2nd ammendment! */
  }
}
