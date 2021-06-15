id = 0;

function getId() {
    return id++;
}

class Canvas {
    constructor() {
        this.figures = [];
        this.state = undefined;
        this.currentFigure = [];
        this.color = "black"
        this.isDragging = false;
        this.movePoint = new Point(0, 0);
    
        this.canvasElement = document.getElementById("canvasElement");
        this.ctx = this.canvasElement.getContext("2d");
    }

    setState(state) {
        console.log("canvas state is:", state)
        this.state = state;

        if(state === CANVAS_STATE.FILL) {
            this.currentFigure.forEach(figure => figure.setFillColor(this.color));
            this.draw();
        }
        if(state === CANVAS_STATE.GROUP) {
            let group = new Group({name :getId() + "group", ctx:this.ctx, figures: this.currentFigure});
            this.currentFigure.forEach(figure => {
                this.figures =this.figures.filter(f => f.name !== figure.name) // ? kak znaem figure 
            })
            this.currentFigure.forEach(figure => figure.setSelected(false))
            this.currentFigure = [];
            this.figures.push(group)
            this.draw();
        }

        if(state === CANVAS_STATE.SAVE) {
            if(this.figures.length === 0) {
                return
            }

            Utils.save(this.figures,"figures","text/plain")
        }
        if( state === CANVAS_STATE.CLEAR){
            this.figures = [];
            this.clearCanvas();
            
        }
        if(state === CANVAS_STATE.ROTATE){
            this.currentFigure.forEach(figure => figure.rotate())
            this.draw();
        }
        
    }

    onMouseDown = (event) => {
        this.isDragging = true;
        switch(this.state) {
            case CANVAS_STATE.RECTANGLE:
                let rect = new Rectangle({name :getId() + "rectangle", x:event.x, y: event.y, ctx: this.ctx});
                this.currentFigure.push(rect);
                this.figures.push(rect);
                break;
                
            case CANVAS_STATE.CIRCLE:
                let circle = new Circle({name :getId() + "circle", x:event.layerX,y: event.layerY,ctx: this.ctx});
                this.currentFigure.push(circle);
                this.figures.push(circle);
                break;
                
                case CANVAS_STATE.ELLIPSE:
                    let ellipse = new Ellipse({name :getId() + "ellipse", x:event.layerX,y: event.layerY,ctx: this.ctx});
                    this.currentFigure.push(ellipse);
                    this.figures.push(ellipse);
                    break;
                    case CANVAS_STATE.NEW_CIRCLE:
                        let newCircle = new NewCircle({name :getId() + "newcircle", x:event.layerX,y: event.layerY,ctx: this.ctx});
                        this.currentFigure.push(newCircle);
                        this.figures.push(newCircle);
                        break;   
            case CANVAS_STATE.SELECT: {
                console.log("mouse down select")
                let intersectedFigure = this.getintersectedFigure((new Point(event.layerX, event.layerY)));
                this.currentFigure?.forEach(figure =>figure.setSelected(false));
                this.currentFigure = []
                
                if(intersectedFigure !== undefined) {
                    intersectedFigure.setSelected(true);
                    this.currentFigure.push(intersectedFigure);
                }
                break;
            }
            case CANVAS_STATE.MULTI_SELECT:{
                    let intersectedFigure = this.getintersectedFigure((new Point(event.layerX, event.layerY)));
                    
                    if(intersectedFigure !== undefined) {
                        if(!this.isFigureSelected(intersectedFigure)) {
                            this.currentFigure.push(intersectedFigure);
                            intersectedFigure.setSelected(true);
                        }
                    }
                    else {
                        this.currentFigure?.forEach(figure =>figure.setSelected(false));
                        this.currentFigure = []
                    }
                    break;
            }
                
            case CANVAS_STATE.MOVE:
                let intersectedFigure = this.getintersectedFigure((new Point(event.layerX, event.layerY)))
                if(intersectedFigure) {
                    if(!this.isFigureSelected(intersectedFigure)) {
                        this.currentFigure.push(intersectedFigure);
                    }
                    this.movePoint = (new Point(event.layerX, event.layerY));
                    console.log(this.currentFigure)
                }
                break;

        }

    }
    onMouseUp = (event) => {
        this.isDragging = false;
        if(this.state === CANVAS_STATE.RECTANGLE 
            || this.state === CANVAS_STATE.CIRCLE
            || this.state === CANVAS_STATE.ELLIPSE
            || this.state === CANVAS_STATE.NEW_CIRCLE){ // others later
            if(this.currentFigure !== undefined) {
                this.currentFigure = [];
            }
        }
        if(this.state === CANVAS_STATE.MOVE) {
            // this.currentFigure = []; 
        }

        console.log("on mouse up", this.currentFigure);
        this.draw();

    }
    onMouseMove = (event) => {
        if(!this.isDragging) {
            return;
        }

        if(this.state === CANVAS_STATE.RECTANGLE 
            || this.state === CANVAS_STATE.CIRCLE
            || this.state === CANVAS_STATE.ELLIPSE
            || this.state === CANVAS_STATE.NEW_CIRCLE)  {// others later
            if(this.currentFigure?.length !== 0) {
                this.currentFigure[0].finish(new Point(event.layerX, event.layerY))
            }
        }

        if(this.state === CANVAS_STATE.MOVE && this.isDragging) {
            if(this.currentFigure.length === 0) {
                return;
            }            
            
            let newX = event.layerX - this.movePoint.x;
            let newY = event.layerY - this.movePoint.y;
            console.log(newX, newY);
            this.currentFigure.forEach( figure => figure.move(newX, newY, this.canvasElement.width, this.canvasElement.height))
            this.movePoint = (new Point(event.layerX, event.layerY)); 

            let lastSelectedFigure = this.currentFigure[this.currentFigure.length -1]
            this.onFigureMove({x: lastSelectedFigure.x, y: lastSelectedFigure.y});
        }
        this.draw();
    }

    setColor(color) {
        this.color = color;
    }

    setLineWidth(lineWidth) {
        this.scollerValue = lineWidth;

        if(this.state === CANVAS_STATE.TRANSPARENCY) {
            console.log(this.currentFigure)
            this.currentFigure.forEach(figure => figure.setTransparancy(lineWidth/10));
        }
        else if(this.state === CANVAS_STATE.LINE_WIDTH) {
            this.currentFigure.forEach(figure => figure.setLineWidth(lineWidth));
        }
        
        this.draw();
    }

    draw() {
        this.clearCanvas();
        this.figures.forEach(figure => {
            figure.draw();
        })
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    getintersectedFigure(point) {
        let intersectedFigure = undefined
        console.log("getting intersted figures", this.figures)
        this.figures.forEach(figure => {
            if(figure.intersects(new Point(point.x, point.y))) {
                console.log("intersected fpgire is ", figure)
                return intersectedFigure = figure;
            }
        });
        return intersectedFigure
    }

    isFigureSelected(figure) {
        return this.currentFigure?.find(currentFigure => currentFigure.name === figure.name) !== undefined
    }

    onFileReadFinished() {
        this.figures.forEach(figure => figure.setContext(this.ctx))
        this.draw();
    }

    moveCurrentFigure(pos) {
        if(this.currentFigure.length !== 0) {
            let lastSelectedFigure = this.currentFigure[this.currentFigure.length -1]
            lastSelectedFigure.teleport(pos)
        }
        this.draw()
    }

    addFigureMoveListener(callback) {
        this.onFigureMove = callback;
    }

}