class Player {
  constructor() {
    this.left = CANVAS_WIDTH / 2 - 25;
    this.top = CANVAS_HEIGHT;
    this.width = 100;
    this.height = 100;
    this.bulletArray = [];
    this.bulletCount = 0;
    this.score = 0; // after counting killed UFOs * 100 points, multiply by cowsSaved(cowHerd.length). ***PENDING: show score somewhere... */
    this.timeToComment = 360; // <- fps
    this.speed = 4;
    this.allowedBurst = 3;
    this.phrasesCounter = 0;
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

    // Our farmer has something to say:
    // the idea is to have a countdown from 360 (6 secs fps), once it reaches 180 the farmer commentsOutLoud. When it reaches 0 it counts 1 phrase and resets the timer
    if (this.timeToComment > 0) {
      this.timeToComment--;
    }
    if (this.timeToComment < 180 && this.timeToComment > 0) {
      this.commentOutLoud();
    }
    if (this.timeToComment <= 0) {
      this.phrasesCounter++; // this is important so it cycles through the different phrases
      this.timeToComment = 360;
    }
  }

  commentOutLoud() {
    const phrasesArray = [
      "YOU JUST WAIT TILL I RELOAD MY GUN",
      "I'LL SHOW YOU INTERGALACTIC RUSTLERS WHAT'S WHAT!",
      "I'M PROTECTED BY GOD AND THE 2ND AMMENDMENT!",
      "YOU GOSHDARN ALIENS!!!",
      "WE'LL BUILD A WALL TO KEEP Y'ALL OUT! ",
      "THEY TOOK OUR JOBS! AND OUR COWS! ",
      "WELCOME TO IOWA!!!",
      "GET OFF MAH PROPERTAH! ",
      "THESE ALIENS SURELY ARE ILLEGAL!",
      "DON'T THREAD ON ME!",
    ];

    // phrasesArray[this.phrasesCounter % phrasesArray.length];
    text(
      phrasesArray[this.phrasesCounter % phrasesArray.length],
      this.left + 75,
      this.top - this.height - 125,
      500,
      200
    );
    textSize(30);
    fill("white");
  }
}
