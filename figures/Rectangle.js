class Rectangle extends Figure {
  width;
  height;
  constructor(startPoint, endPoint, color, width, height) {
    super(startPoint, endPoint, color);
    width = this.getWidth();
    height = this.getHeight();
  }
  draw(ctx) {
    console.log(this);
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

  ///////////////////////////////////

  getWidth() {
    var result = this.endPoint.x - this.startPoint.x;
    console.log(result);
    return result;
  }
  getHeight() {
    return this.endPoint.y - this.startPoint.y;
  }
}
