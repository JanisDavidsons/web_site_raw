
const b = ( sketch ) => {

  let canwasWindowWidth =sketch.windowWidth;
  let canvasWwindowHeight= sketch.windowWidth;
  
  function changeWidowSize(maxWindowSize) {
    

    if (maxWindowSize.matches) { // If media query matches
      canwasWindowWidth =sketch.windowWidth
      canvasWwindowHeight = sketch.windowWidth;
    } else {
      canwasWindowWidth =450;
      canvasWwindowHeight = 450;
    }
  }
  
  var maxWindowSize = window.matchMedia("(max-width: 600px)")
  changeWidowSize(maxWindowSize) // Call listener function at run time
  maxWindowSize.addListener(changeWidowSize) // Attach listener function on state changes
  
  sketch.windowResized=()=>{ 
    if (sketch.windowWidth<600) {
      canwasWindowWidth =sketch.windowWidth;
      canvasWwindowHeight= sketch.windowWidth;
    }   
    sketch.resizeCanvas(canwasWindowWidth, canwasWindowWidth);
  }
  



  //color function constructor
let Color = function () {
  this.r = sketch.random(0, 255);
  this.g = sketch.random(0, 255);
  this.b = sketch.random(0, 255);
};

//circle function constructor
let Circle = function (x, y, size, speedX, speedY, r, g, b) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speedX = speedX;
  this.speedY = speedY;
  Color.call(this, r, g, b);
}

//method to change circle object speed on screeen
Circle.prototype.changeSpeed = function () {
  this.speedX = sketch.random(0, 10);
  this.speedY = sketch.random(0, 10);
}
//method to change circle object x-direction on screeen
Circle.prototype.changeDirectionX = function () {
  this.speedX *= -1;
}
//method to change circle object y-direction on screeen
Circle.prototype.changeDirectionY = function () {
  this.speedY *= -1;
}

//function to move circle object on screeen
Circle.prototype.moveCircle = function () {
  this.x += this.speedX;
  this.y += this.speedY;
}

//function to draw circle object on screen
Circle.prototype.drawObject = function () {
  sketch.fill(this.r, this.g, this.b);
  //sketch.rect(this.x,this.y,this.size,this.size);
  sketch.ellipse(this.x, this.y, this.size);
}

//check if circle has reached end of screen, change move direction.
Circle.prototype.changeDirection = function () {
  if (this.x > canwasWindowWidth-(this.size/2+20) || this.x < 0+(this.size/2)) {
    this.changeDirectionX();
  }
  if (this.y > canvasWwindowHeight-(this.size/2) || this.y < 0+(this.size/2)) {
    this.changeDirectionY();
  }
}

//check if circle has reached end of screen, change move direction.
Circle.prototype.isOutsideScreen = function () {
  if (this.x > canwasWindowWidth-(this.size/2+10)) {
    console.log('Of screen detectedd!');
    this.x -=50;
  }
  if (this.y > canvasWwindowHeight-(this.size/2-10)) {
    this.y -=50;
  }
}

let backgroundColor;

//Array to hold cicle objects
let circles = [];


sketch.setup=()=> {

  backgroundColor = new Color();
  let canvas = sketch.createCanvas(canwasWindowWidth, canvasWwindowHeight);
  //sketch.windowWidth, sketch.windowHeight
  canvas.parent('p5sketch')

  //draw random color backscreen on startup
  sketch.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

  //create circles instnce on startup
  for (i = 0; i < 2; i++) {
    circles[i] = new Circle(sketch.random(100, sketch.windowWidth-100), sketch.random(100,sketch.windowHeight-100), sketch.random(10, 100), sketch.random(-5, 5), sketch.random(-5, 5));
  }
}

sketch.draw=()=>{
  sketch.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

  for (i = 0; i < circles.length; i++) {
    circles[i].moveCircle();
    circles[i].drawObject();
    circles[i].changeDirection();
    circles[i].isOutsideScreen();
  }
}

//create circle object on mouse click.
sketch.mouseClicked=()=>{
  if ((sketch.mouseX>50&&sketch.mouseX<sketch.windowWidth-50)&&(sketch.mouseY>50&&sketch.mouseY<sketch.windowHeight-50)) {
    circles.push(new Circle(sketch.mouseX, sketch.mouseY, sketch.random(10, 100), sketch.random(-5, 5), sketch.random(-5, 5)));
  }
}
}


let myp6 = new p5(b,'p5sketch');
