class Triangle extends Figure {
  constructor(startPoint, endPoint, color) {
    super(startPoint, endPoint, color);
  }
  draw(ctx) {
    console.log(this);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y); //work
    ctx.lineTo(endPoint.x, endPoint.y); // една черта на ляво
    ctx.lineTo(startPoint.x / 2, endPoint.y);
    ctx.lineTo(startPoint.x, startPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
  colorSetter(newColor) {
    this.color = newColor;
  }
  pointInFigure() {}

  //////////////////////ne raboti
  getInstablePointX() {
    return this.startPoint.x * 2;
  }
  getInstablePointY() {
    return this.endPoint.y - this.startPoint.y;
  }
}
