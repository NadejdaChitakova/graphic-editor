let arrOfClickedPoints = [];
let canvasElement, ctx, endXPoint, endYPoint, width, height, startX, startY;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let figures = [];

function onInit() {
  canvasElement = document.getElementById("canvasElement");
  ctx = canvasElement.getContext("2d");

  //addEventListeners();
}

function addEventListeners() {
  canvasElement.addEventListener("click", getCurrentCursonPossition);

  canvasElement.addEventListener("mousedown", (event) => {
    this.mouseClicked = true;
    startPoint = new Point(event.offsetX, event.offsetY);
  });
  canvasElement.addEventListener("mouseup", (event) => {
    this.mouseClicked = false;
    endPoint = new Point(event.offsetX, event.offsetY);
    figures.push(new Rectangle(startPoint, endPoint));

    draw();
  });
  //canvasElement.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(event) {
  if (mouseClicked === false) return;

  endXPoint = event.pageX - canvasElement.offsetLeft;
  endYPoint = event.pageY - canvasElement.offsetTop;

  // drawRectangle();
}
// function getStartPoints() {
//   console.log(arrOfClickedPoints[0].x);
//   startX = arrOfClickedPoints[0].x;
//   startY = arrOfClickedPoints[0].y;
// }

function draw() {
  clearCanvas();

  figures.forEach((figure) => {
    figure.draw(ctx);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
}

function getCurrentCursonPossition(event) {
  // let clickedPoint = new Point(event.clientX, event.clientY);
  // arrOfClickedPoints.push(clickedPoint);
}
