var i = 0;
var images = [];
var time = 3000;

images[0] = "galleriafoto/hasli1.jpg";
images[1] = "galleriafoto/hasli2.jpg";
images[2] = "galleriafoto/hasli3.jpg";
images[3] = "galleriafoto/hasli4.jpg";
images[4] = "galleriafoto/hasli5.jpg";

function changeImg(){
  document.slider.src = images[i];

  if(i < images.length - 1){
    i++;
  } else {
    i = 0;
  }
  setTimeout("changeImg()", time);
}

// setto canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// upload prima immagine
var image = new Image();
image.onload = drawImageNew;
image.src = "galleriafoto/hasli1.jpg";

// upload watermark
var watermark = new Image();
watermark.src = "galleriafoto/filigrana.png";

function drawImageNew() {
  // disegna prima immagine
  ctx.drawImage(image, 0, 0, 300, 150);
  // mette trasparenza a 50%
  ctx.globalAlpha = 0.5
  // disegna watermark
  ctx.drawImage(watermark, 0, 0, 300, 150);
}

window.onload = changeImg();
