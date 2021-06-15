class Triangle extends Figure {
  constructor(startPoint, endPoint, color,isSelected) {
    super(startPoint, endPoint, color,isSelected);
  }
  draw(ctx) {
    super.draw();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineTo(this.startPoint.x / 2, this.endPoint.y);
    ctx.lineTo(this.startPoint.x, this.startPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
  setColor(newColor) {
    this.color = newColor;
  }
  setIsSelected(select){
    this.isSelected = select;
  }

  inersects(Point) {
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
