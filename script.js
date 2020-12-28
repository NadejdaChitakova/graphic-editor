let canvasElement, ctx; //, width, height;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let mouseClickPosition = undefined;
let figures = [];
let color;
let currFig = undefined;

const CANVAS_STATE = {
  NONE: "NONE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
  CIRLCE: "CIRCLE",
  CLEAR: "CLEAR",
  COLOR: "COLOR",
};

let currentButtonState = CANVAS_STATE.NONE;

function checkInsidePoint() {
  figures.forEach((figure) => {
    if (figure.pointInFigure(mouseClickPosition) === true) {
      figure.colorSetter(color);
      clearCanvas();
      redrawsFigures();
    }
  });
}
function redrawsFigures() {
  figures.forEach((figure) => figure.draw());
}
function getColorValue() {
  let colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateColor, false);
  //currFig = undefined;
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

function addEventListeners() {
  canvasElement.addEventListener("mousedown", (event) => {
    this.mouseClicked = true;
    startPoint = new Point(event.offsetX, event.offsetY);
  });
  canvasElement.addEventListener("mouseup", (event) => {
    this.mouseClicked = false;
    endPoint = new Point(event.offsetX, event.offsetY);

    pushFigureOnArr();
    if (figures != 0) {
      draw();
    }
  });
  canvasElement.addEventListener("click", (event) => {
    mouseClickPosition = new Point(event.offsetX, event.offsetY);
    if (color && mouseClickPosition) {
      checkInsidePoint();
    }
  });
}

function pushFigureOnArr() {
  switch (currentButtonState) {
    case "RECTANGLE":
      currFig = new Rectangle(startPoint, endPoint);
      figures.push(currFig);
      break;
    case "TRIANGLE":
      currFig = new Triangle(startPoint, endPoint);
      figures.push(currFig);
      break;
  }
}

function buttonState(id) {
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
    case "colorPicker":
      currentButtonState = CANVAS_STATE.COLOR;
      getColorValue();
      break;
  }
}

function draw() {
  currFig.draw(ctx);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}
function clearCanvasElement() {
  figures = [];
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  currentButtonState = CANVAS_STATE.NONE;
  currFig = undefined;
}
