let limeBoy;
let charles;
let wilbur;
let spriteSheet;
let bugs = [];
let numBugs = 25;
let gameState = "start";
let score = 0;
let time =15;
let hiScore = 0;
let newScore = -1;
let done = false;
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
  switch(gameState){
    case("start"):
    done = false;
    background(0);
    stroke(250,200,200);
    fill(200,100,100);
    textSize(40);
    text("Bug squish",105,150);
    textSize(20);
    text("click here to play",125,200);
    text("Objective: squish as many as you\n        can before time runs out!",50,250);
    break;
    case("play"):
    background(220);
    time -= deltaTime/1000;
    for(let i =0;i<numBugs;i++){
      bugs[i].draw();
      }
      fill(200,100,100);
   text("Score: "+score,10,25);
   text("Time: "+ceil(time),320,25);
   if(time<1){gameState="end"};
    break;
    case("end"):
    background(0,0,0,100);
    time -= deltaTime/1000;
    if(score>hiScore){
    hiScore=score;
    newScore=1;
  }
    stroke(250,200,200);
    fill(300,100,100);
    textSize(40);
    text("Game Over",100,150);
    textSize(20);
    text("final score: "+score,125,200);
    text("High Score: "+hiScore,10,25);
    if(newScore==1){
      textSize(25);
    text("New High Score!",110,240);
    }
    break;
  }
}

function mousePressed(){
  switch(gameState){
  case("start"):
  if(mouseX<250&&mouseX>120&&mouseY>180&&mouseY<210)
   gameState = "play";
   break;
   case("play"):
   for(let i =0;i<numBugs;i++){
    bugs[i].PreStop();
   }
   break;
   case("end"):
   if(time<-3){
   reset();
   gameState = "start";}
   break;
  }
}

function reset(){
  for(let i =0;i<numBugs;i++){
    bugs[i] = new walkingGuy(greenSprite,1,random(175,510),150,80,80,1,random(50,350),random([-1,1]),random(0.5,3));
   }
   time = 15;
   score = 0;
   newScore = -1;
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
   score++;
 }
 else if(this.go == -1){
  this.go = 0;
  this.gop = -1;
  this.xframe = 7;
  score++;
 }

 
 /*else if(this.gop == 1&&this.go == 0){
this.go = 1;
this.xframe = 1;
}
else if(this.gop == -1&&this.go == 0){
  this.go = -1;
  this.xframe = 1;
  }*/
  }
}