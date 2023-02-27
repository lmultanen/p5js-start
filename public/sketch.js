const circlePoints = [];

function setup() {
    createCanvas(400, 400, SVG);

    noLoop();
  }
  
function draw() {
  background(220);

  // for now, just arbitrarily testing out different ranges
  // min of three circles looks a bit sparse tbh

  // format for endpoints is an array of [x1,y1,x4,y4]
  const bezierEndPoints = [[25,25,width-25,height-25],[width/2,25,width/2,height-25],[25,height-25,width-25,25],[25,height/2,width-25,height/2]]

  // trying slightly more random method
  // following array contains 4 subarrays, each standing for possible values of x1,y1,x4,y4 respectively
  let xcoords = [10,width-10]
  for (let i=Math.sqrt(width); i < width - Math.sqrt(width); i+=Math.sqrt(width)) {
    xcoords.push(i)
  }
  let ycoords = [10,height-10]
  for (let i=Math.sqrt(height); i < height - Math.sqrt(height); i+=Math.sqrt(height)) {
    ycoords.push(i)
  }
  // previous xcoords: [25,width-25,width/2,width/3,width/4]
  // previous ycoords: [25,height-25,height/2,height/3,height/4]
  // honestly probably don't even need this array anymore, can just pass in xcoords and ycoords to the function
  const bezierEndPoints2 = [xcoords,ycoords,xcoords,ycoords]
  
  // randBezier(bezierEndPoints,true);
  // randBezier2(bezierEndPoints2,true);
  let numBeziers = Math.floor(Math.random()*4) + 1
  for (let i=0; i<numBeziers; i++) {
    randBezier2(bezierEndPoints2,i%2===0);
  }

  let numCircles = Math.max(Math.floor(Math.random() * (20-numBeziers)),3);
  for (let i=0; i < numCircles; i++) {
    drawRandCircle();
  }
  // drawRandCircle()

  // can now save to svg files; just gets placed in downloads folder
  // save("test.svg")
}

// can later update this to input parameters for x, y coords
// would be neat to generate positions in a number of different ways
// for instance, could generate randomly like below, or try to generate using different mathematical equations
// what could be kinda neat would be to have several different generation methods, then could randomly select which one(s) to use
// may also want to try to implement something to prevent too much overlap as well in the future

// possible positionings to look into: sin/cos/other trig waves, polynomials, bezier curves, spirals, etc
// when generating positionings, may also want to generate sizes as well
// 

function distance(x1,y1,x2,y2) {
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
}

function drawRandCircle() {
  // for now, just capping circle size to between 5-100
  let size = Math.max(Math.floor(Math.random()*width/4),5);
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
  let distancesToBezierCircles = circlePoints.map(point => [distance(xrand,yrand,point[0],point[1]),point[2]])

  let overlapping = distancesToBezierCircles.filter(dist => dist[0] - dist[1]/2 <= size/2)

  // should clean this up and make a helper function to generate the point and size
  while(overlapping.length) {
    size = Math.max(Math.floor(Math.random()*width/4),5);
    xrand = Math.floor(Math.random()*width);
    yrand = Math.floor(Math.random()*height);
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
    distancesToBezierCircles = circlePoints.map(point => [distance(xrand,yrand,point[0],point[1]),point[2]])
    overlapping = distancesToBezierCircles.filter(dist => dist[0] - dist[1]/2 <= size/2)
  }

  fill(randColor());
  noStroke();
  ellipse(xrand,yrand,size)
  circlePoints.push([xrand,yrand,size])
  print(circlePoints.length)

}

function randColor(transparent=true,allowSolid=false) {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  
  let a = transparent ? Math.min(Math.max(Math.floor(Math.random()*255),100),allowSolid ? 255 :200) : 255;
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


function randBezier(endpoints,transparent=false) {
  let fixedCoords = endpoints[Math.floor(Math.random()*endpoints.length)]
  let x1 = fixedCoords[0]
    x2 = Math.floor(Math.random()*width),
    x3 = Math.floor(Math.random()*width),
    x4 = fixedCoords[2]
  let y1 = fixedCoords[1]
    y2 = Math.floor(Math.random()*height),
    y3 = Math.floor(Math.random()*height),
    y4 = fixedCoords[3]
  
  // may look into randomly generating the number of circles to draw, with some floor and ceiling parameters
  // amount of circles could also dictate floor/ceiling of size as well
  bezierPointCircles(x1,x2,x3,x4,y1,y2,y3,y4,12,50,10,transparent);
}

function randBezier2(endpoints,transparent=false) {
  let x1 = endpoints[0][Math.floor(Math.random()*endpoints[0].length)],
    x2 = Math.floor(Math.random()*width),
    x3 = Math.floor(Math.random()*width),
    x4 = endpoints[2].filter(val => val != x1)[Math.floor(Math.random()*(endpoints[2].length-1))]

  let y1 = endpoints[1][Math.floor(Math.random()*endpoints[1].length)]
    y2 = Math.floor(Math.random()*height),
    y3 = Math.floor(Math.random()*height),
    y4 = endpoints[3].filter(val => val != y1)[Math.floor(Math.random()*(endpoints[3].length-1))]

  // could calulate distance between (x1,y1) and (x4,y4) to determine num circles, maxSize, etc
  let straightDist = Math.sqrt((x4-x1)*(x4-x1) + (y4-y1)*(y4-y1))
  let numCircles = Math.max(Math.floor(Math.random()*Math.sqrt(straightDist)),10)
  let maxSize = Math.max(Math.floor(straightDist/numCircles)*1.5,20)
  bezierPointCircles(x1,x2,x3,x4,y1,y2,y3,y4,numCircles,maxSize,10,transparent);
}

function bezierPointCircles(x1,x2,x3,x4,y1,y2,y3,y4,num=10,maxSize=50,minSize=10,transparent=false) {
  let size = Math.max(Math.floor(Math.random()*maxSize),minSize)
  for (let i=0; i<=num; i++) {
    let t = i / num;
    let x = bezierPoint(x1,x2,x3,x4,t)
    let y = bezierPoint(y1,y2,y3,y4,t)
    noStroke()
    fill(randColor(transparent))
    // let size = Math.max(Math.floor(Math.random()*maxSize),minSize)
    ellipse(x,y,size)
    circlePoints.push([x,y,size])
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