let player;
let wall = [30];
let gun;
let bullet = [50];
let cursorX = 0, cursorY = 0;
let block, floor;
let cursorSpeed = 5;
let numWalls = 1;
let bnum = 0;
let bulletExists = false;
let playerAlive = true;
let sensorData = {};
let holding = false;
let moveWall = false; 
let detonating = false;
let countDown;
let boom = [99];
let gameStates = ['start','play','end'];
let gameState = gameStates[0];
let playButtonColor = 255;
let mainButtonColor = 220;
let winner;
let newCount = 120;
let gameOver =false;
let boomNum = 0;
let boomTime = 0;
let running = false;
let explosionCount = 0;
let cannonSound = new Tone.Player("assets/newCannon.mp3");
let runningSound = new Tone.Player("assets/runningSound.wav");

//sound effects
let pitch = 148;
let osc = new Tone.FMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.0,
  sustain: 0.1,
  release: 0.1
}).connect(pan);
osc.connect(ampEnv);
gain.gain.value = 0.1;

const pluck = new Tone.PluckSynth().toDestination();
const delay = new Tone.Reverb(0.5)
const synth = new Tone.MembraneSynth().connect(delay);
delay.toDestination();

//setup
function setup() {
  createCanvas(800, 600);
  //sound effects
  cannonSound.toDestination();
  runningSound.toDestination();
  
  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);
   
  }
}

function draw() {
switch(gameState){
  //Title Screen
case 'start':
  background(100);
  //Title
  text('Gun Runner',275,200);
  textSize(50);
  //Play Button
  push();
  fill(playButtonColor,200,0);
  playButton = rect(355,240,110,60);
  pop();
  if(mouseOn(355,465,240,300))
  playButtonColor = 220;
  else{playButtonColor = 255;}
  text('play',365,280);
  if(mouseIsPressed&&mouseOn(355,465,240,300)){
  gameSprites();
  gameState = 'play';}
  break;
  //Gameplay
case 'play':
 clear();
 background(180);
  serialRead();
  serialWrite();
//Player Control	
  if(sensorData.x)
  cursorX += sensorData.x/512

  if(sensorData.y)
  cursorY += sensorData.y/512

if(cursorX>5)
cursorX = 5;
if(cursorX<(-5))
cursorX = -5;
if(cursorY>5)
cursorY = 5;
if(cursorY<(-5))
cursorY = -5;
 if(playerAlive == true){
  player.vel.x = cursorX*cursorSpeed;
  player.vel.y = cursorY*cursorSpeed;
 }
  cursorX = 0;
  cursorY = 0;
//running.sound.stop();}

//Gun Control
  pointer.position.x = (gun.position.x + cos(gun.rotation-90) * (2000/2 + pointer.width/2));
  pointer.position.y = (gun.position.y + sin(gun.rotation-90) * (2000/2 + pointer.width/2));
  pointer1.position.x = (gun.position.x + cos(gun.rotation-90) * (30/2 + pointer1.width/2));
  pointer1.position.y = (gun.position.y + sin(gun.rotation-90) * (30/2 + pointer1.width/2));
 
  if (kb.pressing('D')) { gun.rotation += 1; ampEnv.triggerAttackRelease('16n');}
  if (kb.pressing('A')){  gun.rotation -= 1; ampEnv.triggerAttackRelease('16n');}
  if (kb.presses('space')){bullet[bnum] = new bullets(bnum,pointer1.x, pointer1.y, 10); 
    bulletExists = true;
    bnum++;
    if(bnum>50){
    bnum = 0; }
    cannonSound.start();
  }
  
  for(i=0;i<bullet.length;i++){
   if(bulletExists == true)
  bullet[i].doit();}
//bomb distance to player
distanceX = distanceTo(player.position.x, bomb.position.x)
distanceY = distanceTo(player.position.y, bomb.position.y)
//bomb pickup check
if(sensorData.sw == true){
  if(distanceX<35&&distanceY<35){
  if(holding == true){
    holding = false;
    bomb.collider = 'd';
    bomb.drag = 2;
  }
  else{holding = true;}
}
}
if(holding==true){pickUp();}

//wall movement
wall[7].wallMove(250,550,1.5);
wall[6].wallMove(150,650,3);

//bomb explosion check
bombGunDistX = distanceTo(bomb.position.x, gun.position.x);
bombGunDistY = distanceTo(bomb.position.y, gun.position.y)
if(bombGunDistX<100&&bombGunDistY<100){
  detonating = true;
}
else{detonating = false;
bomb.color = 'green';
countDown = 180
}
//explosion
if(detonating == true){
 bomb.color = 'red';
 countDown -=1;
 if(countDown<=0){
boom[boomNum] = new Sprite(bomb.position.x,bomb.position.y,150);
boomNum++;
if(boomNum>100)
boomNum = 0;
 
winner = 'Runner'
gameOver = true;
pluck.triggerAttack("D1", "+0");

 }
 }
 //quick game exit
if(kb.presses('q')){
  gameOver = true;
}
//gamestate end check
if(gameOver){
  newCount--;
  if(newCount <= 0){
    gameState = 'end';
  }
}
//console.log(bomb.color.toString().split('')[7]+bomb.color.toString().split('')[8]+bomb.color.toString().split('')[9]);
  break;
  //End screen
 case 'end':
  endGame();
  clear();
  background(100);
  //removing explosion balls
  boomTime++;
  if(boomTime>60&&winner == 'Runner'){
    for(i=0;i<boom.length;i++){
      boom[i].remove();
    }
  }
  //winner check and text
  if(winner == 'Gunner'||winner == 'Runner')
  text(winner+' Wins',235,200);
  else{text('Game Ended',235,200);}
  textSize(60);
//button code
  push();
  fill(mainButtonColor,200,0);
  playButton = rect(345,340,130,60);
  pop();
  if(mouseOn(345,475,340,400))
  mainButtonColor = 220;
  else{mainButtonColor = 255;}
  push();
  textSize(50);
  text('Done',350,385);
  pop();
  //winning player icon
  if(mouseIsPressed&&mouseOn(345,475,340,400)){
  if(winner == 'Runner')
  player.remove();
  else if(winner == 'Gunner')
  gun.remove();
  reset();
  gameState = 'start';}
  break;
}
}
// function blink(){
//   if(bomb.color == 'green'){
//   bomb.color = 'red';}
//   else{bomb.color = 'green';}
// }
let port;
let writer, reader;
let slider; 
let red, green, blue;
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let activationState = { active: false };


let color
try {color = value;}
catch {color = 200;}

function serialWrite() {
  if (writer) {
    if(detonating == false){
   writer.write(new Uint8Array([5]));}
   else{writer.write(new Uint8Array([255]));}

  }
}

async function serialRead() {
  (async () => {
    while (reader) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      try {
        sensorData = JSON.parse(value);
        //console.log(value);
      }
      catch (e) {
        console.log("bad json parse: " + e);
      }
    }
  })();
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 38400 });

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
//pickup bomb
function pickUp(){
  bomb.position.x = (player.position.x + sensorData.x/30);
  bomb.position.y = (player.position.y + sensorData.y/30);
  bomb.collider = 'n';
}
//distance calulation
function distanceTo(thing1,thing2){
  let distance;
  distance = thing1 - thing2;
  if(distance<0){distance = distance*-1}
  return distance;
}
//wall code
class walls {
  constructor(width,height,x,y,rotation=0,moveWall=false){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.moveWall = moveWall
}
//making wall sprites
drawSprites(){
  this.wall = new Sprite(this.width,this.height,this.x,this.y,'k');
  this.wall.color = 'gray';
  this.wall.rotate(this.rotation,1);
}
//accessing wall sprites
getWall(){
  return this.wall;
}
//moving wall
wallMove(leftMost,rightMost,speed=1){
  if(this.wall.position.x>rightMost)
this.moveWall = true; 
else if(this.wall.position.x<leftMost){
  this.moveWall = false;}
if(this.moveWall ==true){
  this.wall.position.x-=speed;
}
else{  this.wall.position.x+=speed;
}
}
 }

//bullet code
 class bullets {
  constructor(num,width,height,x,y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.num = num;
  this.bullet = new Sprite(this.width,this.height,this.x,'none');
  this.bullet.color ='yellow';
}
doit(){
  //setting bullet speed and direction
  if(this.bullet.speed != 10){
    this.bullet.direction = gun.angleTo(pointer);
    this.bullet.speed = 10;}
  
  //for(i=0;i<wall.length;i++){
  if (this.bullet.overlap(wall[0].getWall())
  ||this.bullet.overlap(wall[1].getWall())
  ||this.bullet.overlap(wall[2].getWall())
  ||this.bullet.overlap(wall[3].getWall())
  ||this.bullet.overlap(wall[4].getWall())
  ||this.bullet.overlap(wall[5].getWall())
  ||this.bullet.overlap(wall[6].getWall())
  ||this.bullet.overlap(wall[7].getWall())
  ||this.bullet.overlap(wall[8].getWall())) {
    this.bullet.remove();
    synth.triggerAttackRelease("e3", "8n");
 }
 //player hit check
 if(this.bullet.overlap(player)){
  playerAlive = false;
  player.color = 'red';
  this.bullet.remove();
  winner = 'Gunner';
  gameOver = true;
  synth.triggerAttackRelease("A1", "8n");
 }
 // }
  
}
//bullet sprite
sprite(){
this.bullet = new Sprite(this.width,this.height,this.x,'n');
this.bullet.color ='yellow';
return this.bullet }
 }
 //player and bomb sprites
function gameSprites(){
  player = new Sprite(400,50,30, 'dynamic');
  player.drag = 5
  player.color = 'blue';

  bomb = new Sprite(random(20,780),250,20);
  bomb.drag = 2;
  bomb.color = 'green';
//outer walls
  wall[1] = new walls(5,300,10,800);
  wall[2] = new walls(795,300,10,800);
  wall[3] = new walls(400,5,800,10);
  wall[4] = new walls(400,595,800,10);

//barriors
  wall[0] = new walls(600,400,100,20,45);
  wall[5] = new walls(200,400,100,20,-45);
  wall[6] = new walls(400,200,100,20);
  wall[7] = new walls(400,300,100,20);
  wall[8] = new walls(400,100,100,20);
	//making walls
  for(i=0;i<wall.length;i++)
  wall[i].drawSprites();

  //pointer for gun
  pointer = new Sprite(400,400,20,'none');
  pointer1 = new Sprite(400,400,20,'none');
 pointer.visible = false;
 pointer1.visible = false;
  gun = new Sprite(400,560,15,50,'static');
  gun.color = 'brown'
}
//mouse on thing check
function mouseOn(leftX,rightX,topY,bottomY){
  if (mouseX > leftX && mouseX < rightX && mouseY > topY && mouseY < bottomY) {
   return true;
  } else {
    return false;
  }
}
//gameover code
function endGame(){
  //runner win
  if(winner == 'Runner'){
    player.position.x = 410;
    player.position.y = 280;
    gun.remove();
    bomb.remove();
    for(i=0;i<wall.length;i++){
      wall[i].getWall().remove();
      
    }
    explosionCount++;
    if(explosionCount<90)
    pluck.triggerAttack("D1", "+0");
    
  }
  //gunner win
  else if(winner == 'Gunner'){
    gun.position.x = 410;
    gun.position.y = 280;
    player.remove();
    bomb.remove();
    for(i=0;i<wall.length;i++){
      wall[i].getWall().remove();
      
    }

  }
  //quick exit
    else{
      gun.remove();
      player.remove();
      bomb.remove();
      for(i=0;i<wall.length;i++){
        wall[i].getWall().remove();
      }
      
    }
}
//end game reset
function reset(){
  winner = '';
newCount = 120;
gameOver =false;
playerAlive = true;
boomTime = 0;
explosionCount = 0;
holding = false;
}

