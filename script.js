let canvasElement, ctx; //, width, height;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let mouseClickPosition = undefined;
let figures = [];
let color;
let currentFigure = undefined;

const CANVAS_STATE = {
  NONE: "NONE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
  CIRLCE: "CIRCLE",
  CLEAR: "CLEAR",
  COLOR: "COLOR",
};

let currentButtonState = CANVAS_STATE.NONE;

/////////////////////////////////
//initial function, initializes the context

function onInit() {
  canvasElement = document.getElementById("canvasElement");
  ctx = canvasElement.getContext("2d");

  addEventListeners();
}
//////////////////////////////////////////////

function setButtonState(id) {
  switch (id) {
    case "rectangle":
      currentButtonState = CANVAS_STATE.RECTANGLE;
      break;
    case "triangle":
      currentButtonState = CANVAS_STATE.TRIANGLE;
      break;
    case "clear":
      currentButtonState = CANVAS_STATE.CLEAR;
      clearCanvas();
      break;
    case "colorPicker":
      currentButtonState = CANVAS_STATE.COLOR;
      getColorValue();
      break;
  }
}

function addFiguresOnArr() {
  switch (currentButtonState) {
    case "RECTANGLE":
      currentFigure = new Rectangle(startPoint, endPoint);
      figures.push(currentFigure);
      break;
    case "TRIANGLE":
      currentFigure = new Triangle(startPoint, endPoint);
      figures.push(currentFigure);
      break;
  }
}

////////////////////////////////////////////
// event listeners

function addEventListeners() {
  canvasElement.addEventListener("mousedown", mouseDown);

  canvasElement.addEventListener("mouseup", mouseUp);

  canvasElement.addEventListener("mousemove", mouseMove);

  canvasElement.addEventListener("click", click);
}

////////////////////////////////////////////
//functions related with eventListeners
function mouseDown(event) {
  mouseClicked = true;
  startPoint = new Point(event.offsetX, event.offsetY);
}

function mouseMove(event) {
  console.log(mouseClicked);
  if (mouseClicked === true) {
    endPoint = new Point(event.offsetX, event.offsetY);
    clearContex();
    addFiguresOnArr();
    if (figures != 0) {
      draw();
    }
  }
}

function mouseUp(event) {
  mouseClicked = false;
  endPoint = new Point(event.offsetX, event.offsetY);
}

function click(event) {
  mouseClickPosition = new Point(event.offsetX, event.offsetY);
  if (color && mouseClickPosition) {
    checkInsidePoint();
  }
}
////////////////////////////////////////////

function getColorValue() {
  let colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", updateColor, false);
  colorPicker.addEventListener("change", updateColor, false);
  //currentFigure = undefined;
}

function updateColor(event) {
  color = event.target.value;
}
///////////////////////////////////////////
//
function checkInsidePoint() {
  figures.forEach((figure) => {
    if (figure.pointInFigure(mouseClickPosition) === true) {
      figure.colorSetter(color);
      clearContex(); //проблем при контекста
      redrawsFigures();
    }
  });
}

//////////////////////////////////////////////////
function draw() {
  currentFigure.draw(ctx);
}

function redrawsFigures() {
  figures.forEach((figure) => figure.draw());
}
//////////////////////////////////////////////////

//clear methods
function clearContex() {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}
function clearCanvas() {
  figures = [];
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  currentButtonState = CANVAS_STATE.NONE;
  currentFigure = undefined;
}
