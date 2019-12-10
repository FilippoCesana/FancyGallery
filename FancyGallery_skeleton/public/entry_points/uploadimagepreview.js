// // var image;
// //
// // document.getElementById("imageUpload").onchange = function(event) {
// //   image = new Image();
// //   image.onload = applyWatermark;
// //   image.onerror = failedImage;
// //   image.src = URL.createObjectURL(this.files[0]);
// // };
// //
// // function applyWatermark(){
// // watermark([image, 'http://localhost:3000/images/fancygallery.png'])
// //   .image(watermark.image.lowerLeft(0.5))
// //   .then(img => document.getElementById('container').appendChild(img));
// // }
// //
// // function drawImage(img) {
// //   var canvas = document.getElementById('Mycanvas');
// //   var ctx = canvas.getContext('2d');
// //   canvas.width = this.width;
// //   canvas.height = this.height;
// //   ctx.drawImage(this, 0,0);
// // }
// //
// // function failedImage() {
// //   console.error("File not loaded!");
// // }
//
// document.getElementById("imageUpload").onchange = function(event) {
//   image = new Image();
//   image.onload = drawImageNew;
//   image.src = URL.createObjectURL(this.files[0]);
//   image.onerror = failedImage;
// };
//
//
// // setto canvas
// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
//
// // upload prima immagine
// var image = new Image();
// image.onload = drawImageNew;
// image.src = "galleriafoto/hasli1.jpg";
//
// // upload watermark
// var watermark = new Image();
// watermark.src = "galleriafoto/filigrana.png";
//
// function drawImageNew() {
//   // disegna prima immagine
//   ctx.drawImage(image, 0, 0, 300, 150);
//   // mette trasparenza a 50%
//   ctx.globalAlpha = 0.5
//   // disegna watermark
//   ctx.drawImage(watermark, 0, 0, 300, 150);
// }
//
// function failedImage() {
//   console.error("File not loaded!");
// }

var watermark = new Image();
watermark.src = "/images/fancygallery.png";

//FUNZIONA!!!
document.getElementById("imageUpload").onchange = function(event) {
  var image = new Image();
  image.onload = drawImage;
  image.onerror = failedImage;
  image.src = URL.createObjectURL(this.files[0]);
};

function drawImage() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = this.width;
  canvas.height = this.height;
  ctx.drawImage(this, 0,0);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(watermark, 0,0);
}

function failedImage() {
  console.error("File not loaded!");
}
