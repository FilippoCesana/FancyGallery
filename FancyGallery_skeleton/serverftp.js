const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv({
  ftp: "127.0.0.1:21",
  anonymous: true,
  greeting: "Hello my friend"
});

ftpServer.on('login', (data, resolve, reject) => { console.log("new connection: ", data); });

ftpServer.listen()
.then(r => {
  console.log(r);
});

// connection.on('STOR', (error, fileName) => { console.log(fileName); });

module.exports = ftpServer;

// per killare il FTPserver:
// sudo killall -9 node
