// Set up Tone
let initTone = true;
let pitch = 48;
let currentFrame = 0;
let swinging = false;

let osc = new Tone.FMOscillator(pitch, 'square', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.2,
  decay: 0.2,
  sustain: 0.1,
  release: 0.4
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

let noiseFilter = new Tone.Filter(800,"lowpass").connect(noiseEnv);
noise.connect(noiseFilter);
function preload(){
  saber = loadImage("js/SaberIdle.png");
  saberSwing = loadImage("js/SaberSwing.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if(swinging === false){
  image(saber,125,100,200,200,0+800*currentFrame,0,1000,0);}
  else{image(saberSwing,125,100,200,200,0+815*currentFrame,0,800,0);}
  if((frameCount % 3) === 0){
     currentFrame++;
   }
  if(currentFrame>1&&swinging===false){
    currentFrame=0;
  }
  if(currentFrame>6&&swinging===true){
    currentFrame=0;
    swinging = false;
  }
}
 
function keyPressed(){
  if(keyCode === 32 && initTone === true){
    console.log("Spacebar pressed");
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
 console.log('pressed');
 ampEnv.triggerAttackRelease('4n');
swinging = true;
 
//  osc.frequency.setValueAtTime(pitch,'+1');
//  ampEnv.triggerAttackRelease('4n','+1');

// if(mouseY>200){
//   noiseEnv.triggerAttackRelease(0.5);
// }

}