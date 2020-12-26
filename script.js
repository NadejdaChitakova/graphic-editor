let canvasElement, ctx, width, height;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let mouseClickPosition = undefined;
let figures = [];
let color;

const CANVAS_STATE = {
  NONE: "NONE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
  CIRLCE: "CIRCLE",
  CLEAR: "CLEAR",
};

let currentButtonState = CANVAS_STATE.NONE;

function checkInsidePoint() {
  console.log(figures);
  figures.forEach((figure) =>
    console.log(figure.pointInFigure(mouseClickPosition));
    if(figure.pointInFigure(mouseClickPosition) === true){

    }
  );
}

function getColor() {
  getMousePosition();
  checkInsidePoint();
}

function getColorValue() {
  let colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateColor, false);
  //canvasElement.addEventListener("click", checkInsidePoint, false);
}

function updateFirst(event) {
  //get new color value
  color = event.target.value;
}
function updateColor(event) {
  color = event.target.value;
  console.log(color);
}

function onInit() {
  canvasElement = document.getElementById("canvasElement");
  ctx = canvasElement.getContext("2d");

  //addEventListeners();
}

function getMousePosition() {
  canvasElement.addEventListener("click", (event) => {
    mouseClickPosition = new Point(event.offsetX, event.offsetY);
    console.log(mouseClickPosition);
  });
}
function addEventListeners() {
  canvasElement.addEventListener("click", checkInsidePoint, false);
  canvasElement.addEventListener("mousedown", (event) => {
    this.mouseClicked = true;
    startPoint = new Point(event.offsetX, event.offsetY);
  });
  canvasElement.addEventListener("mouseup", (event) => {
    this.mouseClicked = false;
    endPoint = new Point(event.offsetX, event.offsetY);
    pushFigureOnArr();
    draw();
  });
}

function changeState(id) {
  switch (id) {
    case "rectangle":
      currentButtonState = CANVAS_STATE.RECTANGLE;
      addEventListeners();
      break;
    case "triangle":
      currentButtonState = CANVAS_STATE.TRIANGLE;
      addEventListeners();
      break;
    case "clear":
      currentButtonState = CANVAS_STATE.CLEAR;
      clearCanvasElement();
      break;
  }
}
function pushFigureOnArr() {
  switch (currentButtonState) {
    case "RECTANGLE":
      figures.push(new Rectangle(startPoint, endPoint));
      break;
    case "TRIANGLE":
      figures.push(new Triangle(startPoint, endPoint));
      break;
  }
}

function draw() {
  clearCanvas();

  figures.forEach((figure) => {
    figure.draw(ctx);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
}
function clearCanvasElement() {
  if (currentButtonState === CANVAS_STATE.CLEAR) {
    figures = [0];
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }
}
