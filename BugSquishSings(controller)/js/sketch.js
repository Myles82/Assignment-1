let limeBoy;
let charles;
let wilbur;
let spriteSheet;
let bugs = [];
let numBugs = 25;
let gameState = "start";
let score = 0;
let time =30;
let hiScore = 0;
let newScore = -1;
let done = false;
let pressed = false;

let playSong = true;
///////////////////////////////////////////////////////////////////////////
let port;
let writer, reader;
let slider; 
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let activationState = { active: false };


function keyTyped() {
  if (key === 'a') {
    activationState.active = !activationState.active;
    serialWrite(activationState);
  }
}

// function mouseMoved() {
//   red = round(map(mouseX,0,width,0,255));
//   green = round(map(mouseY,0,height,0,255));
//   blue = slider.value();
// }
let color
try {color = value;}
catch {color = 200;}

function serialWrite(jsonObject) {
  if (writer) {
   writer.write(new Uint8Array([slider.value()]));

  }
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    //console.log(value);
    sensorData = JSON.parse(value);
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
}

class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}

/////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////

let sound1 = new Tone.Player("js/SquishSound.mp3");
let sound2 = new Tone.Player("js/newHitSound.mp3");
let sound3 = new Tone.Player("js/Applause.mp3");
//////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
synth = new Tone.PolySynth().toDestination();
let soundNum = '2'
let songspeed = 120;
const melody = new Tone.Sequence((time,note)=>{
  synth.triggerAttackRelease(note,0.4,time);

},['F'+soundNum,null,'D'+soundNum,null,'C'+soundNum,null,'G'+soundNum,null,'A'+soundNum,null,'E'+soundNum,null,null,null,'E'+soundNum,null,'D'+soundNum,null,'C'+soundNum,null,'D'+soundNum,null,'C'+soundNum,null,null,'G'+soundNum,null,'F'+soundNum,null,'D'+soundNum,null,'E'+soundNum,null,'A'+soundNum,null,null,null,'F'+soundNum,null,'E'+soundNum,null,'D'+soundNum,null,'C'+soundNum,null,'D'+soundNum,null,'A'+soundNum,null,'G'+soundNum,null,'C'+soundNum,null,'D'+soundNum,null]).start("0:0");


let soundNu = '3'
const melody2 = new Tone.Sequence((time,note)=>{
  synth.triggerAttackRelease(note,0.3,time);

},['F'+soundNu,null,'D'+soundNu,null,'C'+soundNu,null,'G'+soundNu,null,'A'+soundNu,null,'E'+soundNu,null,null,null,'E'+soundNu,null,'D'+soundNu,null,'C'+soundNu,null,'D'+soundNu,null,'C'+soundNu,null,null,'G'+soundNu,null,'F'+soundNu,null,'D'+soundNu,null,'E'+soundNu,null,'A'+soundNu,null,null,null,'F'+soundNu,null,'E'+soundNu,null,'D'+soundNu,null,'C'+soundNu,null,'D'+soundNu,null,'A'+soundNu,null,'G'+soundNu,null,'C'+soundNu,null,'D'+soundNu,null]).start("0:0");


/////////////////////////////////////////////////////////////////


function preload(){
  greenSprite = loadImage("js/assets/Bug.png")
  hand = loadImage("js/assets/Hand.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
 for(let i =0;i<numBugs;i++){
  bugs[i] = new walkingGuy(greenSprite,1,random(175,510),150,80,80,1,random(50,350),random([-1,1]),random(0.5,3));
 }
 //wilbur = new walkingGuy(greenSprite,1,200,150,80,80,1,random(0,400));
 sound1.toDestination();
 sound2.toDestination();
 sound3.toDestination();

 if ("serial" in navigator) {
  // The Web Serial API is supported.
  let button = createButton("connect");
  button.position(0,0);
  button.mousePressed(connect);
 
}
}

function draw(){
  if (reader) {
    serialRead();
  }
  switch(gameState){
    case("start"):
    Tone.start();
    Tone.Transport.start();
   // pattern.start(0);
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
    //playSong = false;
    background(220);
fill(200)
    time -= deltaTime/1000;
    for(let i =0;i<numBugs;i++){
      bugs[i].draw();
      }
      fill(200,100,100);
   text("Score: "+score,10,25);
   text("Time: "+ceil(time),320,25);
   if(time<1){gameState="end"
   Tone.Transport.stop();
  };
    break;
    case("end"):
    background(0,0,0,100);
    time -= deltaTime/1000;
    if(score>hiScore){
    hiScore=score;
    newScore=1;
    sound3.start()
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
  if(pressed == false)
  image(hand,sensorData.Xaxis,sensorData.Yaxis,128,128,0,0,600,680);
  else{
  image(hand,sensorData.Xaxis,sensorData.Yaxis,128,128,630,0,600,680);}
 // text("cm: " + sensorData.Switch, 10, 100);
  if(sensorData.Switch == 0){mousePressed();}
  else{mouseReleased();}
}

function mousePressed(){
 if(pressed == false){
  switch(gameState){
  case("start"):
  if(sensorData.Xaxis<250&&sensorData.Xaxis>120&&sensorData.Yaxis>180&&sensorData.Yaxis<210){
   gameState = "play";
   //Tone.Transport.stop();
  }
   break;
   case("play"):
   sound2.start()
   for(let i =0;i<numBugs;i++){
    bugs[i].PreStop();
   }
   break;
   case("end"):
   if(time<-3){
   reset();
   gameState = "start";}
   break;
  }}
  pressed = true;
}

function mouseReleased(){
  pressed = false;
}


function reset(){
  for(let i =0;i<numBugs;i++){
    bugs[i] = new walkingGuy(greenSprite,1,random(175,510),150,80,80,1,random(50,350),random([-1,1]),random(0.5,3));
   }
   time = 15;
   score = 0;
   newScore = -1;
   Tone.Transport.bpm.value = 120;
}

/////////////////////////////////////////////////////////////
function keyPressed(){
  if(keyCode === 32 && initTone === true){
    console.log("Spacebar pressed");
    Tone.start();
    initTone = false;
  }
}
/////////////////////////////////////////////////////////////
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
    this.living = 1;
}
draw() {
  push();
  translate(this.x,this.ry);
  rotate(90);
  scale(this.scalex,this.scaley);
  image(this.spriteSheet,this.xlocation,this.ylocation,this.xsize,this.ysize,this.xframe*32,0,35,35);
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
    
  } pop();
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
  if(this.go==-1){
    if(sensorData.Xaxis-122<=this.x+40&&sensorData.Xaxis-122>=this.x&&sensorData.Yaxis<=this.ry+20&&sensorData.Yaxis>=this.ry-25){ 
      this.Stop();
    }
  }
  if(this.go==1){
    if(sensorData.Xaxis+120<=this.x&&sensorData.Xaxis+170>=this.x&&sensorData.Yaxis<=this.ry+20&&sensorData.Yaxis>=this.ry-25){ 
      this.Stop();
    }
  }
}
Stop(){
 if(this.go == 1&&this.living==1){
    this.go = 0;
   this.gop = 1;
   this.xframe = 7;
   score++;
   this.living = -1;
   for(let i =0;i<numBugs;i++){
    bugs[i].SpeedUp();
   }
  //ampEnv.triggerAttackRelease('4n');
  sound1.start()
 }
 else if(this.go == -1&&this.living==1){
  this.go = 0;
  this.gop = -1;
  this.xframe = 7;
  score++;
  this.living =-1;
  for(let i =0;i<numBugs;i++){
    bugs[i].SpeedUp();
   }
   //ampEnv.triggerAttackRelease('4n');
   sound1.start()
 }
}
 SpeedUp(){
  this.speed=this.speed*1.07;
  songspeed+=1;
  Tone.Transport.bpm.value = songspeed;
 }
 
 
}