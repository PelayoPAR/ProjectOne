class Cow {
  constructor(left, top, id, moonWalk = false) {
    //moonWalk = false is parameter default value
    this.id = id; // <- cowId = cow's cowHerd index
    this.left = left;
    this.top = top;
    this.cowFloor = top;
    this.height = 50;
    this.width = 75;
    this.speed = 1;
    this.direction = "left";
    this.moonWalk = moonWalk; // Having all cows moving forward normally made me a bit less happy xD
    this.abducted = false; // if true, the cow will be forced to stop by some advanced alien technology.
    this.stowedOnUFO = false; // if true, the cow will be kept on the UFO.
  }

  moveCow() {
    // as with UFOs make them change direction when they reach canvas limits:
    const multiplier = this.direction === "left" ? -1 : 1;
    if (!this.abducted) {
      this.left += this.speed * multiplier;
    }
    //margin of 75 introduced in order to avoid bug occurring near Canvas vertical edges, due to UFOs being wider than cows.
    if (this.left < 75 && this.direction === "left") {
      this.direction = "right";
    } else if (
      this.left > CANVAS_WIDTH - this.width - 75 &&
      this.direction === "right"
    ) {
      this.direction = "left";
    }
  }

  drawCow() {
    // make cow's image face direction they're moving to by flipping the image (except for random naturally occuring moonwalking cows):
    if (this.direction === "left") {
      image(cowImg, this.left, this.top, this.width, this.height);
      this.moveCow();
    } else if (this.direction === "right") {
      if (!this.moonWalk) {
        //if it's not a moonwalking cow, cow will flip when reaching the left canvas border:
        image(cowImgFlipped, this.left, this.top, this.width, this.height);
      } else {
        //if it's a way more interesting moonwalking cow, it will moonwalk itself to the other side thanks to Monsanto's MJ cow patented genome:
        image(cowImg, this.left, this.top, this.width, this.height);
      }
      this.moveCow();
    }
  }
}
