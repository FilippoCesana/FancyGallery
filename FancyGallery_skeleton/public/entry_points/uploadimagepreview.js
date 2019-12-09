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
}

function failedImage() {
  console.error("File not loaded!");
}
