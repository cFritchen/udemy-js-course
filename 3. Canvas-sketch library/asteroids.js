//CLI: canvas-sketch asteroids.js
//npm: npx canvas-sketch-cli asteroids.js --open

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true
};

const sketch = () => {
  let circles = [];
  for(let i = 0; i < 100; i++){
    circles.push(new Circle(Math.random() * 2048, Math.random() * 2048, Math.random() * 20));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.lineWidth = 8;

    circles.forEach(circle => {
      circle.draw(context);
      circle.move();
      circle.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);



class Circle{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = Math.random() * 4  - 2;
    this.velocityY = Math.random() * 4 - 2;
  }

  draw(context){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
  }

  move(){
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  bounce(width, height){
    if(this.x <= 0 || this.x >= width){
      this.velocityX *= -1;
    }
    if(this.y <= 0 || this.y >= height){
      this.velocityY *= -1;
    }
  }

}