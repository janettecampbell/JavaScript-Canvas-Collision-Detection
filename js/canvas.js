const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// declare variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const gravity = 1;
const friction = 0.95;
let radius = randomIntFromRange(8, 20);
let circle1;
let circle2;

// Implementation

const init = () => {
  circle1 = new Circle(300, 300, 100, "#36b37e");
  circle2 = new Circle(undefined, undefined, 30, "#ff5630");
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <
    circle1.radius + circle2.radius
  ) {
    circle1.color = "#ff5630";
  } else {
    circle1.color = "#36b37e";
  }
};

init();
animate();
