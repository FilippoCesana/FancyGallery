var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
    image.src = file;
  }
  reader.readAsDataURL(file);
}
