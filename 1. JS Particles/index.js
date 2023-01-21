const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//rectangles as a brush
canvas.addEventListener('mousemove', (e) => {
    ctx.beginPath();
    ctx.rect(e.x, e.y, 10, 10);
    ctx.fill();
})

//creates circle
const degToRad = (deg) => {
    return (deg / 180) * Math.PI;
}; //degrees to radians function

//creates circle
ctx.beginPath();
ctx.arc(200, 200, 100, degToRad(0), degToRad(360) );
ctx.fill();
