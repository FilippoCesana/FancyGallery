const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv({anonymous: true, greeting: "Hello my friend"});

ftpServer.on('login', (data, resolve, reject) => { console.log("new connection: ", data); });

ftpServer.listen()
.then(r => {
  console.log(r);
})

module.exports = ftpServer;
