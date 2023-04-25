let circleList = [];
let spots = [];
let img;

// create circle function
function createCircle() {
  let r = int(random(0,spots.length));
  let spot = spots[r];

  let centerX = spot.x;
  let centerY = spot.y;
  let validCircle = true;

  for (circle of circleList) {
    let distBtwnCircles = dist(centerX, centerY, circle.x, circle.y);
    if (distBtwnCircles < circle.r) {
      validCircle = false;
      break;
    }
  }

  // if the circle is not in another previously created circle, make it
  if (validCircle) {
    return new Circle(centerX, centerY);
  } else {
    return null;
  }
}

function preload() {
  img = loadImage('./2023.png'); 
}

function setup() {
  createCanvas(1440, 1440);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = x + y * img.width;
      let pixelColor = img.pixels[index * 4];
      let pixelBrightness = brightness([pixelColor]);
      if (pixelBrightness > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
}

function draw() {
  background(0);

  let total = 5;
  let attempts = 0;
  for (let i = 0; i < total; i++) {
    let circle = createCircle();
    if (circle !== null) {
      circleList.push(circle);
    }
    attempts++;
    if (attempts > 100) {
      noLoop();
      console.log("finished");
      break;
    }
  }

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
          if (distBtwnCircles - 4 < circle.r + otherCircle.r) {
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
