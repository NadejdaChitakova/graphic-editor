class Triangle extends Figure {
  constructor(startPoint, endPoint, color) {
    super(startPoint, endPoint, color);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
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

  pointInFigure(Point) {
    if (
      this.startPoint.x < Point.x &&
      Point.x < this.endPoint.x &&
      this.startPoint.y < Point.y &&
      Point.y < this.endPoint.y
    ) {
      return true;
    }
    return false;
  }
}
