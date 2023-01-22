const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'curry.png';

let brightnessArray = [];
let particlesArray = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.brightness = 0;
        this.velocity = Math.random() * 3 + 0.1;
        this.radius = Math.random() * 1.5 + 1;
    }

    update(){
        this.y += this.velocity;
        if (this.y >= canvas.height){
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        this.brightness = brightnessArray[Math.floor(this.y) * canvas.width + Math.floor(this.x)]
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    
}

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0,0, canvas.width, canvas.height); 
    console.log(imgData.data);

    for (let i = 0; i < imgData.data.length; i++) {
        const red = imgData.data[i*4];
        const green = imgData.data[(i*4) + 1];
        const blue = imgData.data[(i*4) + 2];
        const brightness = (red + green + blue) / 3;
        brightnessArray.push(brightness);

        //generate 10,000 particles
        for(let x = 0; x < 10000; x++){
            particlesArray.push(new Particle());
        }

    }
    const animate = () => {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle =>{
            particle.update();
            ctx.globalAlpha = particle.brightness * 0.002;
            particle.draw();
        })
        requestAnimationFrame(animate);
    }
    animate();
};