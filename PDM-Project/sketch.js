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
function setup() {
  createCanvas(800, 600);
  player = new Sprite(500,50,50, 'dynamic');
  player.drag = 5
  
  //wall2 = new Sprite(100,100,100,100,'s');
  wall[1] = new walls(5,300,10,800);
  wall[2] = new walls(795,300,10,800);
  wall[3] = new walls(400,5,800,10);
  wall[4] = new walls(400,595,800,10);
  wall[0] = new walls(370,400,100,20);
	
  for(i=0;i<wall.length;i++)
  wall[i].drawSprites();

  pointer = new Sprite(400,400,20,'none');
  pointer1 = new Sprite(400,400,20,'none');
 pointer.visible = false;
 pointer1.visible = false;
  gun = new Sprite(400,560,15,50,'static');
	
  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);
   
  }
}
let number =0;
function draw() {
  background(220);
 clear();
  serialRead();
  clear();
	
  if(sensorData.x)
  cursorX += sensorData.x/512

  if(sensorData.y)
  cursorY += sensorData.y/512
text(cursorX,500,100);
if(cursorX>5)
cursorX = 5;
if(cursorX<(-5))
cursorX = -5;
if(cursorY>5)
cursorY = 5;
if(cursorY<(-5))
cursorY = -5;
 // if(playerAlive == true){
  player.vel.x = cursorX*cursorSpeed;
  player.vel.y = cursorY*cursorSpeed;//}
  cursorX = 0;
  cursorY = 0;

  pointer.position.x = (gun.position.x + cos(gun.rotation-90) * (2000/2 + pointer.width/2));
  pointer.position.y = (gun.position.y + sin(gun.rotation-90) * (2000/2 + pointer.width/2));
  pointer1.position.x = (gun.position.x + cos(gun.rotation-90) * (30/2 + pointer1.width/2));
  pointer1.position.y = (gun.position.y + sin(gun.rotation-90) * (30/2 + pointer1.width/2));
 
  if (kb.pressing('D')) { gun.rotation += 1;}
  if (kb.pressing('A')){  gun.rotation -= 1;}
  if (kb.presses('space')){bullet[bnum] = new bullets(bnum,pointer1.x, pointer1.y, 10); 
    bulletExists = true;
    bnum++;
    if(bnum>50)
    bnum = 0; 
  }
  
  for(i=0;i<bullet.length;i++){
   if(bulletExists == true)
  bullet[i].doit();}
    
text(sensorData.x,200,200);
 
}

let port;
let writer, reader;
let slider; 
let red, green, blue;
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let activationState = { active: false };


// function keyTyped() {
//   if (key === 'a') {
//     // activationState.active = !activationState.active;
//     // serialWrite(activationState);
//     gun.rotationSpeed = 1;
//     gun.color = 'red';
//   }
// }

let color
try {color = value;}
catch {color = 200;}

// function serialWrite(jsonObject) {
//   if (writer) {
//    writer.write(new Uint8Array([slider.value()]));

//   }
// }

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


class walls {
  constructor(width,height,x,y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
}
drawSprites(){
  this.wall = new Sprite(this.width,this.height,this.x,this.y,'static');
  this.wall.color = 'gray';
}
getWall(){
  return this.wall;
}
 }


 class bullets {
  constructor(num,width,height,x,y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.num = num;
  this.bullet = new Sprite(this.width,this.height,this.x,'none');
  
}
doit(){
  if(this.bullet.speed != 10){
    this.bullet.direction = gun.angleTo(pointer);
    this.bullet.speed = 10;}
  
  //for(i=0;i<wall.length;i++){
  if (this.bullet.overlap(wall[0].getWall())
  ||this.bullet.overlap(wall[1].getWall())
  ||this.bullet.overlap(wall[2].getWall())
  ||this.bullet.overlap(wall[3].getWall())
  ||this.bullet.overlap(wall[4].getWall())) {
    this.bullet.remove();
 }
 if(this.bullet.overlap(player)){
  playerAlive = false;
  player.color = 'red';
  this.bullet.remove();
 }
 // }
  
}
sprite(){
return this.bullet = new Sprite(this.width,this.height,this.x,'n');
}
 }