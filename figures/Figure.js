class Figure {
  constructor(name, ctx) {
    this.name = name
    this.color = "black";
    this.fillColor = "white";
    this.lineWidth = 1
    this.transparency = 6;
    this.ctx = ctx;
  }
  
  setContext(ctx) {
    this.ctx = ctx
  }
  setColor(color) {
    this.color = color;
  }

  setFillColor(color) {
    this.fillColor = color;
  }
  setLineWidth(lineWidth){
    this.lineWidth = lineWidth;
  }
  setTransparancy(transparency){
    this.transparency = transparency;
  }

  finish(endPoint) {
  }
  rotate(){
    let x = this.x;
    this.x = this.y;
    this.y = x;
    let height = this.height;
    this.height = this.width;
    this.width = height;
  }
  
  draw() {
    this.ctx.globalAlpha = this.transparency;
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.lineWidth = this.lineWidth;
  }
  finishCreating(){}
  fill(){ }
  setIsSelected() {}
  intersects(point) {}
  delete() {}
  move(x,y) {
  }
  teleport(pos){}


  setProps(props) {
    for(var i in props){
      this[i] = props[i]
    }
  }
  
}
