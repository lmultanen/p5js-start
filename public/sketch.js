

function setup() {
    createCanvas(400, 400);

    noLoop();
  }
  
function draw() {
  background(220);

  // for now, just arbitrarily testing out different ranges
  // min of three circles looks a bit sparse tbh
  let numCircles = Math.max(Math.floor(Math.random() * 29),3);
  for (let i=0; i < numCircles; i++) {
    drawCircle();
  }

}

// can later update this to input parameters for x, y coords
// would be neat to generate positions in a number of different ways
// for instance, could generate randomly like below, or try to generate using different mathematical equations
// what could be kinda neat would be to have several different generation methods, then could randomly select which one(s) to use
// may also want to try to implement something to prevent too much overlap as well in the future

// possible positionings to look into: sin/cos/other trig waves, polynomials, bezier curves, spirals, etc
// when generating positionings, may also want to generate sizes as well
// 
function drawCircle() {
  // for now, just capping circle size to between 5-100
  let size = Math.max(Math.floor(Math.random()*100),5);
  let xrand = Math.floor(Math.random()*width);
  let yrand = Math.floor(Math.random()*height);
  if (xrand < size/2) {
    xrand = size/2;
  }
  if (yrand < size/2) {
    yrand = size/2;
  }
  if (xrand + size/2 > width) {
    xrand = width - size/2;
  }
  if (yrand + size/2 > height) {
    yrand = width - size/2;
  }
  ellipse(xrand,yrand,size)
}

// types of shapes/objects:
// point(x,y), line(four params), unsure what each stand for yet
// basic shapes: triangle(), rect(), quad(), ellipse(), and arc()
// pieChart()
// example polygon() function can allow to create any sided shapes
// same with example star() function
// bezier() can make arcs, could be cool to explore