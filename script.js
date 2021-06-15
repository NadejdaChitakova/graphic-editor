let canvasElement, ctx;
let startPoint = undefined;
let endPoint = undefined;
let mouseClicked = false;
let figures = [];
let color;
let currentFigure = undefined;
let selectedFigure = undefined;

var canvas = new Canvas();

let canvasState = CANVAS_STATE.NONE;

function onInit() {
  canvasElement = document.getElementById("canvasElement");

  addEventListeners();
  initButtons();
}

function addEventListeners() {
  canvasElement.addEventListener("mousedown", this.canvas.onMouseDown); 
  canvasElement.addEventListener("mouseup", this.canvas.onMouseUp);
  canvasElement.addEventListener("mousemove", this.canvas.onMouseMove);
  canvasElement.addEventListener("click", this.canvas.onMouseClick);
}

function initButtons() {
  createButton("Rectangle", CANVAS_STATE.RECTANGLE);
  createButton("Circle", CANVAS_STATE.CIRCLE);
  createButton("Ellipse", CANVAS_STATE.ELLIPSE);

  createButton("Select", CANVAS_STATE.SELECT);
  createButton("Multi select", CANVAS_STATE.MULTI_SELECT);
  createButton("Move", CANVAS_STATE.MOVE);

  createButton("Clear", CANVAS_STATE.CLEAR);
  createButton("Fill", CANVAS_STATE.FILL);
  createButton("Transparency",CANVAS_STATE.TRANSPARENCY);
  createButton("Line widtth",CANVAS_STATE.LINE_WIDTH);

  createButton("Group",CANVAS_STATE.GROUP);
  createButton("Rotate",CANVAS_STATE.ROTATE);
  createButton("Save file", CANVAS_STATE.SAVE)
  createButton("New circle", CANVAS_STATE.NEW_CIRCLE)
  createColorPicker();
  createLineWidthSlider();
  createReadButton();
  createPositionFields();
}

function createButton(innerHTML, canvasState) {
  let button = document.createElement("button");
  button.addEventListener("click", () => setCanvasState(canvasState));
  button.innerHTML = innerHTML;
  button.id = canvasState;
  button.classList.add("btn");
  button.classList.add("col");
  document.getElementById("buttonsContainer").appendChild(button);
}

function createColorPicker() {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color"
  colorPicker.addEventListener("click", () => setCanvasState(CANVAS_STATE.COLOR));
  colorPicker.addEventListener("input", onColorChange);
  colorPicker.classList.add("form-control-color");
  colorPicker.classList.add("col");

  document.getElementById("buttonsContainer").appendChild(colorPicker);
}
function createLineWidthSlider(){
  // /type="range" min="1" max="100" value="50"
  let slider = document.createElement("input");
  slider.type = "range"
  slider.min = 1;
  slider.max = 10;
  slider.value = 1;
  slider.addEventListener("input", onLineWidthChange);
  slider.classList.add("form-control-slider");
  slider.classList.add("col");

  
  document.getElementById("buttonsContainer").appendChild(slider);
}

function createReadButton() {
  let button = document.createElement("input");
  button.addEventListener("change", (e) =>{
    var fileToLoad = e.target.files[0];
    if (fileToLoad == undefined) return;
    Utils.readFile(fileToLoad);
  })

  button.type = "file"
  button.id = canvasState;
  button.classList.add("btn");
  button.classList.add("col");
  document.getElementById("buttonsContainer").appendChild(button);
}


function createPositionFields() {
  let xInput = document.createElement("input");
  let yInput = document.createElement("input");
  
  xInput.addEventListener("change", e => {
    this.canvas.moveCurrentFigure({x:e.target.value});
  })
  yInput.addEventListener("change", e => {
    this.canvas.moveCurrentFigure({y:e.target.value});
  })


  let updatePosInput = (pos) => {
    xInput.value = pos.x;
    yInput.value = pos.y
  }

  canvas.addFigureMoveListener(updatePosInput);

  xInput.type = "number";
  yInput.type = "number"

  document.getElementById("buttonsContainer").appendChild(xInput);
  document.getElementById("buttonsContainer").appendChild(yInput);
  
}




onColorChange = (event) => {
  this.canvas.setColor(event.target.value);
}

onLineWidthChange = (event) => {
  console.log(event.target.value)
  this.canvas.setLineWidth(event.target.value);
}
//------------------------------------------

function setCanvasState(state) {
  this.canvasState = state;
  this.canvas.setState(state);
  console.log("canvas state ", state)
}

function createFigure() {
  switch (canvasState) {
    case "RECTANGLE":
      currentFigure = new Rectangle(startPoint, endPoint, ctx);
      break;
    case "TRIANGLE":
      currentFigure = new Triangle(startPoint, endPoint, ctx);
      break;
  }
}


function mouseDown(event) {
  this.canvas.onMouseDown(event);


  mouseClicked = true;
  startPoint = new Point(event.offsetX, event.offsetY);
  var figure = getIntersectedFigure();

  if (canvasState === CANVAS_STATE.SELECTED) {
    unselectAllFigure();
    currentFigure = undefined;
    selectedFigure = undefined;
    selectFigure();
  }

  if (canvasState === CANVAS_STATE.SELECTED && figure === false) {
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
  //if state == fill
  colorFigure();
}

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


























function colorFigure(){//SET COLOR ON STROKE 

  
  if (canvasState === CANVAS_STATE.COLOR) {
    getIntersectedFigure();
    //colorFigure();
  }

  selectedFigure.setColor(color);

  if ( canvasState === CANVAS_STATE.FILL) {
      console.log('fill state2');
    selectedFigure.fill();
  }

  redrawFigures();
  
}


// function getIntersectedFigure(){
//   let isIntersect = false;
//   figures.forEach((figure) => {
//     if (figure.inersects(startPoint) === true) {
//       selectedFigure = figure;
//       isIntersect = true;
//     }
//   });
//   return isIntersect;
// }

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
// //draw methods
// function draw() {
//   currentFigure.draw();
// }  

function redrawFigures() {
  clearContext();
  figures.forEach((figure) => {
    figure.draw(ctx);
  });


}

//----------------------------------------------
//clear methods
// function clearContext() {
//   ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
// }

// function clearCanvas() {
//   figures = [];
//   ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasState = CANVAS_STATE.NONE;
//   currentFigure = undefined;
// }
