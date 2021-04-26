let canvasElement, ctx;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let figures = [];
let color;
let currentFigure = undefined;
let selectedFigure = undefined;


const CANVAS_STATE = {
  NONE: "NONE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
  CIRLCE: "CIRCLE",
  CLEAR: "CLEAR",
  COLOR: "COLOR",
  SELECTED: "SELECTED"
};

let ButtonState = CANVAS_STATE.NONE;

//initial function, initializes the context
//------------------------------------------

function onInit() {
  canvasElement = document.getElementById("canvasElement");
  ctx = canvasElement.getContext("2d");

  addEventListeners();
}
//------------------------------------------

function setButtonState(id) {
  switch (id) {
    case "rectangle":
      ButtonState = CANVAS_STATE.RECTANGLE;
      break;
    case "triangle":
      ButtonState = CANVAS_STATE.TRIANGLE;
      break;
    case "clear":
      ButtonState = CANVAS_STATE.CLEAR;
      clearCanvas();
      break;
    case "colorPicker":
      ButtonState = CANVAS_STATE.COLOR;
      getColorValue();
      break;
    case "selectFigure":
      currentFigure = undefined;
      ButtonState = CANVAS_STATE.SELECTED;
      break;
      default :
      ButtonState = CANVAS_STATE.NONE;
      break;
  }
}

function createFigure() {
  switch (ButtonState) {
    case "RECTANGLE":
      currentFigure = new Rectangle(startPoint, endPoint, ctx);
      break;
    case "TRIANGLE":
      currentFigure = new Triangle(startPoint, endPoint, ctx);
      break;
  }
}

//-------------------------------------------
// event listeners

function addEventListeners() {

  canvasElement.addEventListener("mousedown", mouseDown);

  canvasElement.addEventListener("mouseup", mouseUp);

  canvasElement.addEventListener("mousemove", mouseMove);

  canvasElement.addEventListener("click",mouseClick);

}

//------------------------------------------
//functions related with eventListeners

function mouseDown(event) {
  mouseClicked = true;
  startPoint = new Point(event.offsetX, event.offsetY);
  var figure = getIntersectedFigure();

  if (ButtonState === CANVAS_STATE.SELECTED) {//? da se iznesyt
    unselectAllFigure();
    currentFigure = undefined;
    selectedFigure = undefined;
    selectFigure();

  }

  if (ButtonState === CANVAS_STATE.SELECTED && figure === false) {
    unselectAllFigure();
  }
}

function mouseMove(event) {
  if (mouseClicked === true) {
    
    endPoint = new Point(event.offsetX, event.offsetY);
    if(!currentFigure) {
      createFigure();
    }
    else {
      currentFigure.setEndPoint(endPoint)
    }
    clearContext();
    if (figures.length > 0) {
      redrawFigures();
    }

    if (currentFigure != undefined) {
      draw();
    }
  }
}

function mouseUp(event) {

  mouseClicked = false;

  if (currentFigure != undefined) {

    figures.push(currentFigure);
    currentFigure = undefined;
    redrawFigures()
  }
}

function mouseClick(){
  if (ButtonState === CANVAS_STATE.COLOR) {
    console.log("in mouse click");
    getIntersectedFigure();
    colorsFigure();
}}

//--------------------------------------
//Get color from input

function getColorValue() {
  let colorPicker = document.getElementById("colorPicker");

  colorPicker.addEventListener("change", updateColorValue, false);
  currentFigure = undefined;
}

function updateColorValue(event) {
  console.log("update color", event.target.value)
  color = event.target.value;
}
//--------------------------------------
//method from select and check point in figure


function colorsFigure(){
  console.log(color)
  selectedFigure.setColor(color);
  redrawFigures();
}


function getIntersectedFigure(){//и
  let isIntersect = false;
  figures.forEach((figure) => {
    if (figure.pointInFigure(startPoint) === true) {
      selectedFigure = figure;
      isIntersect = true;
    }
  });
  return isIntersect;
}

function selectFigure() {
  let isIntersect = getIntersectedFigure();

  if (isIntersect== true) {
    
    selectedFigure.setIsSelected(true);
    redrawFigures();

  }
}

function unSelectFigure(figure){
  if (selectedFigure === true) {
    
    figure.setIsSelected(false);

  }
}
function unselectAllFigure(){
  figures.forEach((figure) => figure.setIsSelected(false));
}

//--------------------------------------------
//draw methods
function draw() {
  currentFigure.draw();
}

function redrawFigures() {
  clearContext();
  figures.forEach((figure) => {
    figure.draw(ctx);
  });


}

//----------------------------------------------
//clear methods
function clearContext() {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function clearCanvas() {
  figures = [];
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  ButtonState = CANVAS_STATE.NONE;
  currentFigure = undefined;
}
