//-----------------------------------------------------------------------------
// Si ringrazia Andrea per l'aiuto :)
//-----------------------------------------------------------------------------

var image;
var watermark;

document.getElementById("imageUpload").onchange = function(event) {
  if(watermark !== undefined) {
    watermarkn = new Image();
    watermarkn.onload = loadImage.bind(this)
    watermarkn.src = "/images/fancygallery.png";
  } else {
    loadImage.call(this)
  }
};

function loadImage(e) {
  image = new Image();
  image.onload = drawImage;
  image.onerror = failedImage;
  image.src = URL.createObjectURL(this.files[0]);
}

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



document.getElementById("button").addEventListener('click', e => {
        const value = document.getElementById("event_id").value;
        
        doJSONRequest('POST', 'http://localhost:3000/event/addImage', {}, {dataURL :JSON.stringify(canvas.toDataURL()), eventId : value})});
