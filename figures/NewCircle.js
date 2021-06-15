class NewCircle extends Figure {
    constructor(props) {
      super(props.name,ctx);
      this.radius = this.width/2;
      this.Path2d = undefined;
  
      for(var i in props){
        this[i] = props[i]
      }
  
    }
    finish(endPoint) {
      this.width = endPoint.x - this.x;
      this.height = endPoint.y - this.y;
      this.radius = Math.max(Math.abs(this.width), Math.abs(this.height));
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
  
    setSelected(select){
      this.selected = select;
    }
     degrees_to_radians(degrees){
        return degrees * Math.PI / 180;
      }
       radians_to_degrees(radians){
        return radians * 180 / Math.PI;
      };

     degreesToRadians(degrees) {
        return (degrees * Math.PI)/180;
    }
    draw() {
      this.ctx.save();
      super.draw();
      this.ctx.beginPath();
      this.draw2(undefined, 167)
      this.Path2d = new Path2D();

      this.ctx.stroke(this.Path2d);

    this.ctx.closePath();

    this.ctx.stroke();
      
     

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

    draw2(canvas, angle){
        var context = this.ctx, centerX = this.x, centerY = this.y ,radius = this.radius;
        context.lineWidth = 1;
        context.strokeStyle = 'blue';
        var begin = 0; 
        let interval = 45;
        var arcSize= this.degreesToRadians(interval);
        context.beginPath();
        context.moveTo(centerX,centerY);
        context.closePath();
        context.stroke();
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        for(var startingAngle=begin; startingAngle < 360;){
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, this.degreesToRadians(startingAngle), startingAngle + arcSize, false);
            context.closePath();
            context.stroke();
            startingAngle = startingAngle + interval;
        }
    }
  
    intersects(point) {
        var dx = Math.abs(this.x - point.x);
        var dy = Math.abs(this.y - point.y);
        return dx * dx + dy * dy <= this.radius * this.radius;    }
  
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