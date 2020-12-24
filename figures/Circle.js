class Circle extends Figure {
  constructor(startPoint, endPoint, color) {
    super(startPoint, endPoint, color);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      startPoint.x,
      startPoint.y,
      endPoint.y - startPoint.y,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
  pointInFigure() {}
}
