let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "nuggets": "sounds/chicken.wav",
  "drop": "sounds/droplet.wav",
  "duct": "sounds/duct.wav",
  "slide": "sounds/slide.wav",
  "birdie": "sounds/birdie.wav"
})

const delay = new Tone.FeedbackDelay("8n",0.5)

let soundNames = ["nuggets","drop","duct","slide","birdie"];
let buttons = [];
let dSlider;
let fSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay)
  delay.toDestination();

  soundNames.forEach((word,index)=>{
    buttons[index] = createButton(word);
    buttons[index].position(0, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

dSlider = createSlider(0.,1.,0.5,0.05);
dSlider.mouseReleased(()=>{
  delay.delayTime.value = dSlider.value();
})

dSlider = createSlider(0.,1.,0.5,0.05);
dSlider.mouseReleased(()=>{
  delay.feedback.value = dSlider.value();
})

}

function draw() {
  background(220,100,100);
  textSize(15);
  text("Click the buttons for desired sound",105,25);
  text("Delay Time",30,390);
  text("Feedback",167,390);
}


function buttonSound(whichSound) {
  sounds.player(whichSound).start();
}