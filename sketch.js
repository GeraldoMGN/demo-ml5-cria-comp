let faceapi;
let video;
let detections;

const emojiURL = "https://cdn.shopify.com/s/files/1/1061/1924/products/Thinking_Face_Emoji_large.png?v=1571606036";
let emoji;

// by default all options are set to true
const detectionOptions = {
  withDescriptors: false,
};

var setup = () => {
  createCanvas(360, 270);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Load model
  faceapi = ml5.faceApi(video, detectionOptions, modelReady);

  // Load emoji
  emoji = loadImage(emojiURL);
};

// When the model is ready, start the drawing loop
const modelReady = () => faceapi.detect(gotResults);

// Drawing loop: Drawns the camera and emoji on canvas
const gotResults = (err, result) => {
  if (err) return;
  
  detections = result;

  image(video, 0, 0, width, height);
  if (detections && detections.length > 0) {
    drawEmoji(detections);
  }
  
  faceapi.detect(gotResults);
};

const drawEmoji = (detections) => detections.forEach((detection) => {
  const { x: _x, y: _y, _width, _height } = detection.alignedRect._box;
  image(emoji, _x, _y, _width, _height);
});