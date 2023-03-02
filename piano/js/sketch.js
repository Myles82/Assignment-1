//const synth = new Tone.Synth();
const reverb = new Tone.Synth({
	"frequency"  : 345 ,
	"envelope"  : {
		"attack"  : 0.001 ,
		"decay"  : 0.4 ,
		"release"  : 0.2
	}  ,
	"harmonicity"  : 8.5 ,
	"modulationIndex"  : 40 ,
	"resonance"  : 300 ,
	"octaves"  : 1.5
});
//"frequency" : 45 , 


let notes = {
  'q':'C4',
  'w':'D4',
  'e':'E4',
  'r':'F4',
  't':'G4',
  'y':'A4',
  'u':'B4',
  'i':'C5'
}
let dSlider;
function setup() {
  createCanvas(400, 400);
 // synth.toDestination();

 // slider = new Nexus.Slider("#slider")
 reverb.toDestination();

  //slider.on('change',)
  dSlider = createSlider(0.,100,0.5,1);
dSlider.mouseReleased(()=>{
 reverb.volume.value = dSlider.value();
});
}

function draw() {
  background(220);
 text("Volume: "+reverb.volume.value,50,390);
}

function keyPressed(){
  let whatNote = notes[key];
  console.log(whatNote);
  reverb.triggerAttackRelease(whatNote, "8n");
}