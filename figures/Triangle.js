class Triangle extends Figure {
  constructor(startPoint, endPoint, color) {
    super(startPoint, endPoint, color);
  }
  draw(ctx) {
    console.log(this);
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineTo(this.startPoint.x / 2, this.endPoint.y);
    ctx.lineTo(this.startPoint.x, this.startPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
  colorSetter(newColor) {
    this.color = newColor;
  }
  pointInFigure() {}
}
