const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = 1.5;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

//triangle top
const triangleTop = new Point(window.innerWidth / 2, 50);
triangleTop.draw();

//triangle bottom left
const triangleBottomLeft = new Point(50, window.innerHeight - 50);
triangleBottomLeft.draw();

//triangle bottom right
const triangleBottomRight = new Point(window.innerWidth - 50, window.innerHeight - 50);
triangleBottomRight.draw();

const triangle = [triangleTop, triangleBottomLeft, triangleBottomRight]

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawRest(prevPoint){
    let randomCorner, middlePoint;

    for(let i=0; i < 100000; i++){
        //pick random corner
        randomCorner = triangle[getRandomInt(0, 3)];

        //find middle point
        middlePoint = new Point((prevPoint.x + randomCorner.x) / 2, (prevPoint.y + randomCorner.y) / 2);
        middlePoint.draw();
        prevPoint = middlePoint;
    }

}

canvas.addEventListener('click', function(e){
    const firstPoint = new Point(e.x, e.y);
    firstPoint.draw();
    drawRest(firstPoint);
},{once: true});