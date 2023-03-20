let handpose;
let video;
let leftPomme;
let topPomme;
let score = 0;
let hands = [];

const displayScore = document.getElementById("score");
const interScore = document.getElementById("inter");
displayScore.innerHTML = "Score = 0 ";

var centi = 0;
var mili = 0;
var sec = 0;
var sec_;
var afficher;
var compteur;
// affichage du compteur à 0
document.getElementById('timer').innerHTML = "0" + sec + ":" + "0" + mili;

function chrono() {
  setInterval(function (){
    mili++;
    if (mili > 9) {
      mili = 0;
    }
  }, 1);
  centi++;
  centi*10;//=======pour passer en dixièmes de sec
  //=== on remet à zéro quand on passe à 1seconde
  if (centi > 9) {
    centi = 0;
    sec++;
  }  
  if (sec < 10) {
    sec_ = "0" + sec;
  }
  else {
    sec_ = sec;
  }
  afficher = sec_ + ":" + centi + mili;
  document.getElementById("timer").innerHTML = afficher;
  reglage = window.setTimeout("chrono();",100);
}




function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  chrono();
  console.log("Model ready!");
}

function draw() {
  translate(video.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  Grabbed();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
function Grabbed(){
    if (document.getElementById("pomme")){
      let count = 0;
        if(hands[0]){
          console.log(640-leftPomme)
          console.log(topPomme)

          hands[0].landmarks.forEach(point => {
            if(point[0] <=640-leftPomme && point[0] >=540-leftPomme ){
              if(point[1]>=topPomme && point[1]<=topPomme+100){
                count+=1
              }
            }
        })
        console.log(hands[0].landmarks[20])
        if(count>15){
          score +=1;
          console.log("score : " + score)
          
          displayScore.innerHTML = "Score = " + score ;
          const display = document.createElement("li")
          display.innerHTML = afficher + " Score " + score;
          interScore.appendChild(display);

          document.getElementById("pomme").remove();
        };
        }
    }
    else{
        let pomme = document.createElement("div");
        pomme.id = "pomme" ;
        topPomme = randomIntFromInterval(0, 380);
        leftPomme = randomIntFromInterval(0, 540);
        pomme.style.top = topPomme
        pomme.style.left = leftPomme
        document.body.appendChild(pomme);
    }
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }