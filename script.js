let arrOfClickedPoints = [];

function drawRectangle() {
  let canvasElement = document.getElementById("canvasElement");
  if (canvasElement.getContext) {
    var ctx = canvasElement.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}

function drawYrRectangle() {
  if (canvasElement.getContext) {
    var ctx = canvasElement.getContext("2d");

    let firstPointOfArr = arrOfClickedPoints[0];
    let xTopPoint = firstPointOfArr[0];
    let yTopPoint = firstPointOfArr[1];

    let secondPointOfArr = arrOfClickedPoints[1];
    let xSecPoint = secondPointOfArr[0];
    let ySectPoint = secondPointOfArr[1];

    ctx.beginPath();
    ctx.moveTo(xTopPoint, yTopPoint);
    ctx.lineTo(xSecPoint, ySectPoint);
    ctx.lineTo(25, 105);
    ctx.fill();
  }
}

function onMouseMove(event) {
  let XYpoints = {
    xPossition: event.clientX,
    yPossition: event.clientY,
  };
  if (event) {
    console.log(Object.values(XYpoints));
  }
  return arrOfClickedPoints.push(Object.values(XYpoints));
}
