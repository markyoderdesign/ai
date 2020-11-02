let truncation_value = 0.5;
let inp;
let slider;
let seed;
let button;


const model = new rw.HostedModel({
  url: "https://black-white-c6b054ee.hosted-models.runwayml.cloud/v1/",
  token: "LgJhpSabhOQXDM5M6NFTfw==",
});

if(typeof(model)=='undefined'){
  console.log('model inactive')
} else {
  console.log('model active')
  document.querySelectorAll('#inactive')[0].classList.add('hidden')
}

async function checkModel() {
  document.querySelector('body').classList.add('loading')
  if(typeof(model)!='undefined'){
    await model.waitUntilAwake();
    document.querySelector('body').classList.remove('loading')
  }
}

function setup() {

  slider = createSlider(0.5,5, 100, .1);
 


  // create canvas
  pixelDensity(1)
  createCanvas(451,634);
  checkModel();
}

function draw() {
  textSize(32);
  fill(255);
  textAlign(CENTER);

  button.position(19, 19);
  slider.position(15, 70);
  
}




function mousePressed() {

  getImageFromRunway()



}


async function getImageFromRunway() {
  randomSeed(mouseX+mouseY);
  z = createZ(512)
  // const path = "http://localhost:8000/query";
  const data = {
    z: z,
    truncation: slider.value()
    
  };

  if(typeof(model)!='undefined'){
    const result = await model.query(data)
    gotImage(result)
  }
}

function gotImage(result) {
  i = createImg(result.image, imageReady);
  i.hide();
}

function imageReady() {
  image(i, 0, 0,451,634);
}

function createZ(v) {
  let z =[];
  for(let zi = 0; zi < v; zi++){
    z.push(random(-1, 1))
  }
  return z;
}
