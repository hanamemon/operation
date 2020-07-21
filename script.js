/* global p5 */
const p = new p5(() => {});

class Obstacle {
  constructor() {
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    this.width = p.random(10, 100);
    this.height = p.random(10, 100);
  }

  display() {
    p.fill(0);
    p.rect(this.x, this.y, this.width, this.height);
    // console.log("hi this should work")
  }
}

let backgroundColor = 95;
let message;

let obstacleList = [];
let numObstacles = 30;

let changedToRed = false;
let counter = 0;

p.setup = function() {
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);

  for (let i = 0; i < numObstacles; i++) {
    obstacleList.push(new Obstacle());
  }
};

p.draw = function() {
  p.background(backgroundColor);

  p.ellipse(p.mouseX, p.mouseY, 10);

  for (let i = 0; i < numObstacles; i++) {
    let currentRect = obstacleList[i];

    currentRect.display();
    let hit = p.collideRectCircle(
      currentRect.x,
      currentRect.y,
      currentRect.width,
      currentRect.height,
      p.mouseX,
      p.mouseY,
      10
    );

    if (hit) {
      console.log("hit!");
      changedToRed = true;
      //backgroundColor = p.color(0, 10, 100);
      
    }

    if (changedToRed) {
      backgroundColor = p.color(0, 10, 100);
      counter++;
      console.log(counter);
      if (counter == 120) {
        counter = 0;
        changedToRed = false;
        resetPosition();
      }
    }

    if (p.mouseX >= p.width - 10) {
      console.log("win!");
      backgroundColor = p.color(120, 10, 100);
    }
  }
};

p.mousePressed = function() {
  // circlePosition.x = p.random(p.width);
  // circlePosition.y = p.random(p.height);
};

function resetPosition() {
  // p.mouseX = 9;
  // p.mouseY = 9;
  backgroundColor = 95;
}

function getDistance(x1, y1, x2, y2) {
  let sideA = x2 - x1;
  let sideB = y2 - y1;
  let hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);

  return hypotenuse;
}

// function computeColor() {
//   let distance = getDistance(
//     circlePosition.x,
//     circlePosition.y,
//     p.mouseX,
//     p.mouseY
//   );

//   if (distance > 200) {
//     backgroundColor = p.color(240, 10, 100);
//     message = "cold";
//   } else if (distance > 50 && distance < 200) {
//     backgroundColor = p.color(120, 10, 100);
//     message = "warm";
//   } else {
//     backgroundColor = p.color(0, 10, 100);
//     message = "hot";
//   }
// }
