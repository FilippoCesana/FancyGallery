// var image;
//
// document.getElementById("imageUpload").onchange = function(event) {
//   image = new Image();
//   image.onload = applyWatermark;
//   image.onerror = failedImage;
//   image.src = URL.createObjectURL(this.files[0]);
// };
//
// function applyWatermark(e){
//   watermark([this, '/images/fancygallery.png'])
//     .image(watermark.image.lowerLeft(0.5))
//     .then(drawImage);
// }
//
// function drawImage(img) {
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   canvas.width = img.width;
//   canvas.height = img.height;
//   ctx.drawImage(img, 0,0);
// }
//
// function failedImage() {
//   console.error("File not loaded!");
// }

//
//-----------------------------------------------------------------------------
//
var image;
var watermark;

document.getElementById("imageUpload").onchange = function(event) {
  image = new Image();
  image.onload = drawImage;
  image.onerror = failedImage;
  image.src = URL.createObjectURL(this.files[0]);
  watermarkn = new Image();
  watermarkn.src = "/images/fancygallery.png";
};

function drawImage() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = this.width;
  canvas.height = this.height;
  var n = this.width/3;
  var m = (n/watermarkn.width)*watermarkn.height;
  var px = this.width/20;
  var py = this.height-px-m;
  ctx.drawImage(this, 0,0);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(watermarkn, px, py, n, m);
}

function failedImage() {
  console.error("File not loaded!");
}
