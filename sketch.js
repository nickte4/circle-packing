let circleList = [];

function createCircle() {
  let centerX = random(width);
  let centerY = random(height);
  let validCircle = true;

  for (circle of circleList) {
    let distBtwnCircles = dist(centerX, centerY, circle.x, circle.y);
    if (distBtwnCircles < circle.r) {
      validCircle = false;
      break;
    }
  }

  // if the circle is not in another previously created circle, make it
  if (validCircle) circleList.push(new Circle(centerX, centerY));
}

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(0);
  createCircle();
  for (circle of circleList) {
    // if circle touches window edge, stop growing
    if (circle.edges()) {
      circle.growing = false;
    } else {
      // if circle overlaps with another, stop growing
      for (otherCircle of circleList) {
        if (circle != otherCircle) {
          let distBtwnCircles = dist(
            circle.x,
            circle.y,
            otherCircle.x,
            otherCircle.y
          );
          if (distBtwnCircles < circle.r + otherCircle.r) {
            circle.growing = false;
            break;
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
