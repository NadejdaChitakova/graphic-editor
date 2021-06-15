var Utils = {}

var SHAPES = {
    CIRCLE:"CIRCLE",
    ELLIPSE:"ELLIPSE",
    RECT : "RECT",
    NEW_CIRCLE : "NEW_CIRCLE"
}

Utils.save = function(data, name, type) {
    var textToWrite = JSON.stringify(data); // convert data from jso object
    var textFileAsBlob = new Blob([textToWrite], { type: type });
    var fileNameToSaveAs = name;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }
  
    downloadLink.click();
  };

  Utils.readFile = function(fileToLoad) {
    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      let shapes = JSON.parse(textFromFileLoaded);

      canvas.figures = shapes.map(m => { return getShape(m)});
      canvas.onFileReadFinished();
  
      // CanvasManager.render();
      // console.log(CanvasManager.layerShapeCollection);
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
  };

  function getShape(m) {
    if (m.name.includes("group")) {
        let figures = m.figures;
        m.figures = []
        let group = new Group(m)
        figures.forEach(t => {
          group.figures.push(getShape(t));
      });
      return group
    }
    else if(m.name.includes("new")){
      return Utils.shapesFactory(SHAPES.NEW_CIRCLE, m);
     }
      else if (m.name.includes("circle")) {
        return Utils.shapesFactory(SHAPES.CIRCLE, m)
    } else if (m.name.includes("rectangle")) {
      return Utils.shapesFactory(SHAPES.RECT, m)
    } else if (m.name.includes("ellipse")) {
        return Utils.shapesFactory(SHAPES.ELLIPSE, m)
    }
  }

  Utils.shapesFactory = function(type, data) {
    switch (type) {
      case SHAPES.CIRCLE:
        return new Circle(data);
      case SHAPES.ELLIPSE:
        return new Ellipse(data);
      case SHAPES.RECT:
        return new Rectangle(data);
      case SHAPES.NEW_CIRCLE:
        return new NewCircle(data);
    }
  };
  