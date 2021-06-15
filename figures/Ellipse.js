class Ellipse extends Figure {
    constructor(props) {
      super(props.name,ctx);
      this.radius = this.width/2;
      this.Path2d = undefined;
  
      for(var i in props){
        this[i] = props[i]
      }
  
    }
    finish(endPoint) {
      this.width = Math.abs(endPoint.x - this.x);
      this.height = Math.abs(endPoint.y - this.y);
      this.radius = Math.abs(this.width);
    }
  
    setSelected(select){
      this.selected = select;
    }

    teleport(pos) {
        if(pos.x) {
          let intPos = parseInt(pos.x)
          this.x = intPos;
        }
    
        if(pos.y) {
          let intPos = parseInt(pos.y)
    
          this.y = intPos;
        }
    
      }
  
    draw() {
      this.ctx.save();
      super.draw();
      this.ctx.beginPath();
      this.Path2d = new Path2D();
      console.log(this.x, this.y, this.radius);
      this.Path2d.ellipse(this.x, this.y, this.height, this.width, Math.PI / 2, 0, 2*Math.PI)
      this.ctx.stroke(this.Path2d);
      
      this.ctx.fill(this.Path2d);
      
      if (this.selected) {
        this.ctx.lineWidth = 1;
        this.ctx.color = "black"
        this.ctx.rect(this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
        this.ctx.stroke();
      }
  
      this.ctx.closePath();
      this.ctx.restore();
    } 
  
    intersects(point) {
      return this.ctx.isPointInPath(this.Path2d, point.x, point.y)
    }
  
    move(x,y, canvasWidth, canvasHeight) {
  
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
  
    }
  }
  