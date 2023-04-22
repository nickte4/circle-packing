/* Circle Class */

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
  }

  // display circle function
  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }

  // grow circle function
  grow() {
    if (this.growing) this.r += 1;
  }

  // check if circle has touched edge of window
  edges() {
    return (
      this.x + this.r > width ||
      this.x - this.r < 0 ||
      this.y + this.r > height ||
      this.y - this.r < 0
    );
  }
}
