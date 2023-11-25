const r = document.querySelector(":root");
const rs = getComputedStyle(r);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const everyButton = document.querySelectorAll(".btn-group button");

const recButton = document.getElementById("rectButton");
const circButton = document.getElementById("circButton");
const arcButton = document.getElementById("arcButton");
const deleteButton = document.getElementById("deleteButton");

let markerColor = rs.getPropertyValue("--darkGray");
let elementColor = rs.getPropertyValue("--darkBlue");
let selectedColor = rs.getPropertyValue("--lightBlue");

let currentShape;
let createdShapes = [];
let currentSnapPoint;
let snapPoints = [];
let snapDistance = 10;

let currentButton = null;

let numberOfClicks = 0;
let isInitFinished = false;
let isDrawingStarted = false;

canvas.onclick = shapeSelector;
canvas.onmousemove = mouseMove;
//canvas.onmousemove = snapToPoints;

everyButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentButton != null) {
      currentButton.classList.remove("selected");
    }
    currentButton = button;
    button.classList.add("selected");
  });
});

function shapeSelector(e) {
  x = e.x;
  y = e.y;
  if (currentSnapPoint) {
    x = currentSnapPoint.x;
    y = currentSnapPoint.y;
  }
  switch (currentButton === null || currentButton.id) {
    case "rectButton":
      drawElement(x, y, Rectang);
      break;
    case "circButton":
      drawElement(x, y, Circle);
      break;
  }
}

function drawElement(x, y, figure) {
  if (!isDrawingStarted) {
    currentShape = new figure(x, y);
    isDrawingStarted = true;
  } else {
    createdShapes.push(currentShape);
    document.onmouseup = null;
    document.onmousemove = null;
    isDrawingStarted = false;
    currentShape = null;
  }
}

function mouseMove(e) {
  dot = snapToPoints(e);
  let x = e.x;
  let y = e.y;
  if (dot) {
    x = dot.x;
    y = dot.y;
  }
  renderFigure(x, y);
}

function renderFigure(x, y) {
  if (isDrawingStarted) {
    currentShape.setEnd(x, y);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let dots = initBackground();
  if (!isInitFinished) {
    snapPoints = dots;
    isInitFinished = true;
  }
  if (currentShape) {
    currentShape.draw();
  }
  if (createdShapes) {
    createdShapes.forEach((shape) => {
      shape.draw();
    });
  }
  if (currentSnapPoint) {
    currentSnapPoint.draw();
  }
  requestAnimationFrame(animate);
}

animate();

function snapToPoints(e) {
  let points = [];
  let distances = [];
  snapPoints.forEach((dot) => {
    let distance = Math.sqrt(
      Math.pow(dot.x - e.x, 2) + Math.pow(dot.y - e.y, 2)
    );
    if (distance < snapDistance) {
      points.push(dot);
      distances.push(distance);
    }
  });
  if (points.length != 0) {
    let selectedPoint = points[distances.indexOf(Math.min(...distances))];
    let dot = new Dot(selectedPoint.x, selectedPoint.y);
    dot.color = selectedColor;
    dot.radius = 5;
    currentSnapPoint = dot;
    return dot;
  } else {
    currentSnapPoint = null;
  }
}
