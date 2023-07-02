const canvas = document.getElementById('layoutSpace');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const recButton = document.getElementById('rectButton');
const circButton = document.getElementById('circButton');
const arcButton = document.getElementById('arcButton');
const deleteButton = document.getElementById('deleteButton');


let markerColor = 'white';
let markerDistance = canvas.width / 30;

let currentShape;
let createdShapes = [];

class Dot {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = canvas.width * 0.0005;
        this.color = markerColor;
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}


class Rectang {
    constructor(x, y){
        this.x0 = x;
        this.y0 = y;
        this.x1 = 0;
        this.y1 = 0;
        this.color = markerColor;
    }
    
    draw(){
        ctx.strokeStyle = markerColor;
        ctx.beginPath();
        ctx.rect(this.x0, this.y0, this.x1, this.y1);
        ctx.stroke();
    }

    setEnd(x1, y1){
        this.x1 = x1 - this.x0;
        this.y1 = y1 - this.y0;
    }

}

function initBackground(){
    numberOfXMarkers = canvas.width / markerDistance;
    numberOfYMarkers = parseInt(canvas.height / markerDistance);
   
    xStart = (canvas.width - (markerDistance * numberOfXMarkers)) / 2;
    yStart = (canvas.height - (markerDistance * numberOfYMarkers)) / 2;

    for (let i = 0; i < numberOfXMarkers; i++) {
        for (let j = 0; j < numberOfYMarkers; j++) {
           currentMarker = new Dot(xStart + (i * markerDistance), yStart + (j * markerDistance));
           currentMarker.draw();
        }
    }
}

let numberOfClicks = 0;
let isDrawingStarted = false;
canvas.onclick = drawRect;
canvas.onmousemove = followRect;


function drawRect(e) {
    if(!isDrawingStarted){
        currentShape = new Rectang(e.x, e.y);
        isDrawingStarted = true;
    } else {
        createdShapes.push(currentShape);
        document.onmouseup = null;
        document.onmousemove = null;
        isDrawingStarted = false;
        currentShape = null;
    }
}

function followRect(e){
    if(isDrawingStarted){
        currentShape.setEnd(e.x, e.y);
    }
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initBackground();
    if(currentShape){
        currentShape.draw();
    }
    if(createdShapes){
        createdShapes.forEach(shape => {
            shape.draw();
        });
    }
    requestAnimationFrame(animate);
}

animate();



