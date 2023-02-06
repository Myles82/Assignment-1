let limeBoy;
let charles;
let wilbur;
let spriteSheet;
function preload(){
  spriteSheet = loadImage("assets/SpelunkyGuy.png");
  greenSprite = loadImage("assets/Green.png")
  limeSprite = loadImage("assets/56409.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  charles = new walkingGuy(spriteSheet,1,200,200,80,80);
  wilbur = new walkingGuy(greenSprite,1,100,150,80,80);
  limeBoy = new walkingGuy(limeSprite,1,150,300,80,80);
}

function draw(){
  background(220);
  charles.draw();
   wilbur.draw();
   limeBoy.draw();
}

function keyPressed(){
  charles.keyPressed(RIGHT_ARROW,LEFT_ARROW);
 wilbur.keyPressed(RIGHT_ARROW,LEFT_ARROW);
 limeBoy.keyPressed(RIGHT_ARROW,LEFT_ARROW);
}

function keyReleased(){
  charles.keyReleased();
 wilbur.keyReleased();
 limeBoy.keyReleased();
}

class walkingGuy {
  constructor(spriteSheet,scalex,x,ylocation,xsize,ysize,xframe=0){
    this.spriteSheet = spriteSheet;
    this.xframe = xframe;
    this.yframe = 80;
    this.walking = 0;
    this.scalex = scalex;
    this.x = x;
    this.xlocation = 0;
    this.ylocation = ylocation;
    this.xsize = xsize;
    this.ysize = ysize;
}
draw() {
  push();
  translate(this.x,0);
  scale(this.scalex,1);
  image(this.spriteSheet,this.xlocation,this.ylocation,this.xsize,this.ysize,this.xframe*80,0,80,80);
  pop();
  if(this.walking == 1||this.walking == -1){
    this.xframe++;
    if(this.walking == 1){
      this.x+=3;}
    if(this.walking == -1){
      this.x-=3;}
    if(this.xframe>8){this.xframe = 1;}
  }
  frameRate(15);
}
keyPressed(rightControl,leftControl){
  if(keyCode === rightControl){
    this.walking = 1;
   this.xframe = 1;
   this.scalex = 1;
   
 }
 if(keyCode === leftControl){
  this.walking = -1;
  this.xframe =1;
  this.scalex = -1;
 }
 }
 keyReleased(){

  this.walking = 0;
  this.xframe = 0;
}
}