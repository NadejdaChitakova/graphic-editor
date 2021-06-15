class Rectangle extends Figure {
  constructor(props) { 
    super(props.name, props.ctx);
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.endPoint = props.endPoint;

    for ( var i in props ) {
      this[i] = props[i];
  }

    if(this.endPoint) {
      this.calculateEdges();
    }
  }

  finish(endPoint) {
    this.endPoint = endPoint;
    this.width = endPoint.x - this.x;
    this.height = endPoint.y - this.y;
    this.calculateEdges();
  }
  
  teleport(pos) {
    if(pos.x) {
      let intPos = parseInt(pos.x)
      this.x = intPos;
      this.endPoint.x = this.width + this.x;
    }

    if(pos.y) {
      let intPos = parseInt(pos.y)

      this.y = intPos;
      this.endPoint.y = this.height +this.y
    }

    this.calculateEdges()
  }
  calculateEdges() {
    this.topLeft = new Point(Math.min(this.endPoint.x, this.x), Math.min(this.endPoint.y, this.y));
    this.bottomRight = new Point(Math.max(this.endPoint.x, this.x), Math.max(this.endPoint.y, this.y));
  }


  setSelected(select){
    this.selected = select;
  }

  draw() {
    this.ctx.save();
    super.draw();
    this.ctx.beginPath();

    this.ctx.strokeRect(
      this.x,
      this.y,
      this.width,
      this.height
    );

    
    this.fill();
    
    if (this.selected) {
      this.ctx.lineWidth = 1;
      this.ctx.color = "black"
      this.ctx.rect(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
      this.ctx.stroke();
    }

    this.ctx.closePath();
    this.ctx.restore();
  } 

  fill(){
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  intersects(point) {
      let intersectsX = this.topLeft.x < point.x && point.x < this.bottomRight.x;
      let intersectsY = this.topLeft.y < point.y && point.y < this.bottomRight.y

      return (intersectsX && intersectsY )
  }

  move(x,y, canvasWidth, canvasHeight) {
    this.endPoint.x += x;
    this.endPoint.y += y;
    this.x += x;
    this.y += y;

    if( this.x <= 0 ) {
      this.x = 0;
    }
    if( this.x + this.width >= canvasWidth) {
      this.x = canvasWidth - this.width;
    }

    if(this.y <= 0) {
      this.y = 0;
    }
    if(this.y + this.height >= canvasHeight) {
      this.y = canvasHeight - this.height;
    }
    this.calculateEdges();

  }

}
