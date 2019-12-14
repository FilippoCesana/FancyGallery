// Per killare il server FTP:
// sudo killall -9 node

// Per runnare tutto:
// sudo yarn run

const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv({
  anonymous: true,
  greeting: "Hello my friend",
  tls: false
});

ftpServer.on('login', ({connection, username, password}, resolve, reject) => {
  console.log("new connection: ", connection);
  console.log("user: ", username);
  console.log("psw: ", password);
  //mettere cartella dove si vogliono salvare i file:
  resolve ({root : "/Users/nbrunner/Documents/GitHub/FancyGallery/FancyGallery_skeleton/public/images_canon"});
  connection.on('STOR', (error, fileName) => {
    console.log("newfile: ", fileName);
    //inviare un msg socket.io arrivato nuovo file!!
  });
});

ftpServer.listen()
.then(r => {
  console.log(r);
});

module.exports = ftpServer;
