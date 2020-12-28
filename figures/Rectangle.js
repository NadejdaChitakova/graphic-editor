class Rectangle extends Figure {
  width;
  height;
  constructor(startPoint, endPoint, color, width, height) {
    super(startPoint, endPoint, color);
    width = this.getWidth();
    height = this.getHeight();
  }
  colorSetter(newColor) {
    this.color = newColor;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeRect(
      this.startPoint.x,
      this.startPoint.y,
      this.getWidth(),
      this.getHeight()
    );
    ctx.fill();

    ctx.closePath();
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
  delete() {}

  ///////////////////////////////////

  getWidth() {
    var result = this.endPoint.x - this.startPoint.x;
    return result;
  }
  getHeight() {
    return this.endPoint.y - this.startPoint.y;
  }
}
