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
    drawRandCircle();
  }

  // format for endpoints is an array of [x1,y1,x4,y4]
  const bezierEndPoints = [[50,50,width-50,height-50],[width/2,50,width/2,height-50],[50,height-50,width-50,50],[50,height/2,width-50,height/2]]

  randBezier(bezierEndPoints);
}

// can later update this to input parameters for x, y coords
// would be neat to generate positions in a number of different ways
// for instance, could generate randomly like below, or try to generate using different mathematical equations
// what could be kinda neat would be to have several different generation methods, then could randomly select which one(s) to use
// may also want to try to implement something to prevent too much overlap as well in the future

// possible positionings to look into: sin/cos/other trig waves, polynomials, bezier curves, spirals, etc
// when generating positionings, may also want to generate sizes as well
// 
function drawRandCircle() {
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
  fill(randColor());
  noStroke();
  ellipse(xrand,yrand,size)
}

function randColor(transparent=true) {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  
  let a = transparent ? Math.min(Math.max(Math.floor(Math.random()*255),100),200) : 255;
  return color(r,g,b,a);
}


// first tried making all points random, but that led to possibility of very small, potentially not as interesting curves
// second, trying anchoring the first and last points to top left and bottom right respectively
// next, will want to try to add some further randomness back into the equation
// -- thought is to have an array of possible starting and ending (x,y) coordinate pairs, like [[(x1,y1),(x4,y4)]]
// -- this would allow the possibility for more varied arc paths and could lead to more interesting artwork
// -- then, could randomly select the start/end points in some manner
// Further, after that in place, would like to experiment with other ways to generate circle placements
// Then, in the draw() function, could randomly select which one(s) to generate and lead to more variance of output


function randBezier(endpoints) {
  let fixedCoords = endpoints[Math.floor(Math.random()*endpoints.length)]
  let x1 = fixedCoords[0]
    x2 = Math.floor(Math.random()*width),
    x3 = Math.floor(Math.random()*width),
    x4 = fixedCoords[2]
  let y1 = fixedCoords[1]
    y2 = Math.floor(Math.random()*height),
    y3 = Math.floor(Math.random()*height),
    y4 = fixedCoords[3]
  // noFill();
  // stroke(0)
  // bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  
  // may look into randomly generating the number of circles to draw, with some floor and ceiling parameters
  // amount of circles could also dictate floor/ceiling of size as well
  bezierPointCircles(x1,x2,x3,x4,y1,y2,y3,y4,12);
}

function bezierPointCircles(x1,x2,x3,x4,y1,y2,y3,y4,num=10) {
  for (let i=0; i<=num; i++) {
    let t = i / num;
    let x = bezierPoint(x1,x2,x3,x4,t)
    let y = bezierPoint(y1,y2,y3,y4,t)
    noStroke()
    fill(randColor(false))
    let size = Math.max(Math.floor(Math.random()*50),10)
    ellipse(x,y,size)
  }
}



// could look to generate a button or allow user to click to generate a new image
// for purposes of if ever wanted to deploy

// types of shapes/objects:
// point(x,y), line(four params), unsure what each stand for yet
// basic shapes: triangle(), rect(), quad(), ellipse(), and arc()
// pieChart()
// example polygon() function can allow to create any sided shapes
// same with example star() function
// bezier() can make arcs, could be cool to explore