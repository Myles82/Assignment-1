let limeBoy;
let charles;
let wilbur;
let spriteSheet;
let bugs = [];
let numBugs = 15;
function preload(){
  spriteSheet = loadImage("assets/SpelunkyGuy.png");
  greenSprite = loadImage("assets/Bug.png")
  limeSprite = loadImage("assets/56409.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
 for(let i =0;i<numBugs;i++){
  bugs[i] = new walkingGuy(greenSprite,1,random(175,510),150,80,80,1,random(50,350),random([-1,1]),random(0.5,3));
 }
 //wilbur = new walkingGuy(greenSprite,1,200,150,80,80,1,random(0,400));
}

function draw(){
  background(220);
for(let i =0;i<numBugs;i++){
  bugs[i].draw();
 }
// wilbur.draw();
}

function mousePressed(){
  for(let i =0;i<numBugs;i++){
    bugs[i].PreStop();
   }
   //wilbur.PreStop();
}
class walkingGuy {
  constructor(spriteSheet,scalex,x,ylocation,xsize,ysize,xframe=0,ry,go,speed){
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
    this.go =go;
    this.gop = this.go;
    this.ry = ry;
    this.scaley = go;
    this.speed = speed;
}
draw() {
  push();
  translate(this.x,this.ry);
  rotate(90);
  scale(this.scalex,this.scaley);
  image(this.spriteSheet,this.xlocation,this.ylocation,this.xsize,this.ysize,this.xframe*32,0,35,35);
  pop();
  if(this.go==1||this.go==-1){
  if(this.x<-120){
    this.scaley =1;
    this.go=1;
    this.x+=280;
  }
    if(this.x>520){
      this.scaley =-1;
      this.go=-1;
      this.x-=280;
    }
  //if(this.walking == 1||this.walking == -1){
    this.xframe++;
    if(this.go==1){
      this.x+=3*this.speed;}
    if(this.go==-1){
      this.x-=3*this.speed;}
    if(this.xframe>6){this.xframe = 1;}
  }
  frameRate(20);
}
keyPressed(rightControl,leftControl){
  if(keyCode === rightControl){
    this.walking = 1;
   this.xframe = 1;
  this.scaley = 1;
   
 }
 if(keyCode === leftControl){
  this.walking = -1;
  this.xframe =1;
  this.scaley = -1;
 }
 }
 keyReleased(){

  this.walking = 0;
  this.xframe = 0;
}
PreStop(){
  if(this.gop=-1){
    if(mouseX-122<=this.x+40&&mouseX-122>=this.x&&mouseY<=this.ry+35&&mouseY>=this.ry-35){ 
      this.Stop();
    }
  }
  if(this.gop=1){
    if(mouseX+161<=this.x+40&&mouseX+161>=this.x&&mouseY<=this.ry+35&&mouseY>=this.ry-35){ 
      this.Stop();
    }
  }
}
Stop(){
 if(this.go == 1){
    this.go = 0;
   this.gop = 1;
   this.xframe = 7;
 }
 else if(this.go == -1){
  this.go = 0;
  this.gop = -1;
  this.xframe = 7;
 }
 
 else if(this.gop == 1&&this.go == 0){
this.go = 1;
this.xframe = 1;
}
else if(this.gop == -1&&this.go == 0){
  this.go = -1;
  this.xframe = 1;
  }
  }
}