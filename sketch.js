let faceapi;
let video;
let detections;

const emojiURL = "https://cdn.shopify.com/s/files/1/1061/1924/products/Thinking_Face_Emoji_large.png?v=1571606036";
let emoji;

// by default all options are set to true
const detectionOptions = {
  withDescriptors: false,
};

function setup() {
  createCanvas(360, 270);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Load model
  faceapi = ml5.faceApi(video, detectionOptions, modelReady);

  // Load emoji
  emoji = loadImage(emojiURL);
}

function modelReady() {
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  
  detections = result;

  background(255);
  image(video, 0, 0, width, height);
  if (detections) {
    if (detections.length > 0) {
      drawEmoji(detections);
    }
  }
  
  faceapi.detect(gotResults);
}

function drawEmoji(detections) {
  for (let i = 0; i < detections.length; i += 1) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    image(emoji ,x, y, boxWidth, boxHeight);
  }
}
