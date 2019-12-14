const hostname = '0.0.0.0';
const port = 21;

const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://' + hostname + ':' + port, {anonymous: true, greeting: "hello"});

ftpServer.on('login', ({connection, username, password}, resolve, reject) => {
  console.log("new connection: ", connection);
  console.log("user: ", username);
  console.log("psw: ", password);
  //mettere cartella dove si vogliono salvare i file:
  resolve ({root : "/Users/nbrunner/Documents/GitHub/FancyGallery/FancyGallery_skeleton/public/images_canon"});
  connection.on('STOR', (error, fileName) => {
    console.log("newfile: ", fileName);

    var canon_id = 098767890;

    new_image = new Image();
    new_image.src = fileName;
    new_image.onload = drawImage;

    function drawImage() {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext('2d');
      canvas.width = this.width;
      canvas.height = this.height;
      ctx.drawImage(this, 0,0);
    }

    var imgUrl = canvas.toDataURL();

    doJSONRequest('POST', 'event/'+ canon_id +'/image', {}, {dataURL : imgUrl});

  });
});

ftpServer.listen()
.then(r => {
  console.log(r);
});

module.exports = ftpServer;
