function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(100,0,100);
  //Example 1
  push();
  //green rectangle
  fill(120,80,100);
  noStroke();
  rect(0,0,130,62);
  pop();
  //white circle
  fill(120,0,100);
  circle(30,30,50);
  //white square
  fill(120,0,100);
  square(70,5,50);

  //Example 2

  push();
  noStroke();
  //red circle
  fill(10,100,100,0.5);
  circle(65,100,50);
  //blue circle
  fill(240,100,100,0.5);
  circle(47,130,50);
  //green circle
  fill(100,100,100,0.5);
  circle(83,130,50);
  pop();

  //Example 3

  //black rectangle
  push();
  fill(120,80,0);
  noStroke();
  rect(0,180,130,62);
  pop();
  //pacman
  fill(60,100,100);
  circle(30,210,50);
  fill(0,0,0);
  triangle(30,211,0,183,0,237);
  fill(10,100,100);
  push();
  //red Ghost
  noStroke();
  circle(92,210,50);
  rect(67,206,50,29);
  fill(10,10,100);
  circle(80,210,17);
  circle(105,210,17);
  fill(240,100,100);
  circle(80,210,10);
  circle(105,210,10);
  pop();

  //Example 4

  //blue square
  push();
  fill(240,100,50)
  noStroke();
  square(0,260,130);
  pop();
  push();
  //green circle
  stroke(10,0,100);
  fill(120,100,50);
  circle(62,320,60);
  //star
  fill(10,100,100);
  beginShape();
  vertex(62,289);
  vertex(70,310);
  vertex(92,310);
  vertex(74,324);
  vertex(80,345);
  vertex(62,332);
  vertex(44,345);
  vertex(50,324);
  vertex(32,310);
  vertex(54,310);
  vertex(62,289);
  endShape();
  //triangle(62,290,57,310,67,310);
  pop();
}
