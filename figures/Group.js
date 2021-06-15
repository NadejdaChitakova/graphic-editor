class Group extends Figure {
    constructor(props){
        super(props.name, props.ctx);
        for ( var i in props ) {
            this[i] = props[i];
        }
        this.figures = props.figures;
    }

    setColor(color) {
        this.figures.forEach(figure => figure.setColor(color));
    }
    setSelected(select){
        console.log(this.figures)
        this.figures.forEach(figure => figure.setSelected(select));
    }
    draw(){
        this.figures.forEach(figure => figure.draw());
    }

    setContext(ctx) {
        this.figures.forEach(figure => figure?.setContext(ctx));
    }

    teleport(pos) {
    }

    
  setFillColor(color) {
        this.figures.forEach(figure => figure.setFillColor(color));
  }
  setLineWidth(lineWidth){
    this.figures.forEach(figure => figure.setLineWidth(lineWidth));
  }
  setTransparancy(transparency){
    this.figures.forEach(figure => figure.setTransparancy(transparency));
  }


    intersects(point) {
        let intersects = false
        this.figures.forEach(figure => {
            if(figure.intersects(new Point(point.x, point.y))) {
                intersects = true
                return;
            }
        });
        return intersects
    }

    move(x,y, canvasWidth, canvasHeight) {
        this.figures.forEach(figure => figure.move(x, y, canvasWidth, canvasHeight));
    }
}