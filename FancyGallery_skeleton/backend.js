const log = require("debug")(":->Backend:");
const socketServer = require("./socketServer");

const ftpServer = require("./serverftp.js");
const socket = require("socket.io");
// const b_parse = require('body-parser');

async function run() {
    //Waits until a connection with mongo is established
    const app = await require("./backendInit");

    app.set('port', process.env.PORT || 3000);
    const server =  app.listen(app.get('port'), function () {
       log('Express server listening on port ' + server.address().port);
    });

    //TODO put in a separate file? or maybe not
    const io = socket(server);
    io.on('connection', function (socket) {
        console.log('connected')
        socket.on('visiting', function (data) {
            socket.join(data.eventId.toString());
            console.log('socket joined room:', data.eventId);
        })
    });

    app.set('io', io);//To be used on image post route
    socketServer.io = io
    // app.use(b_parse({limit:'50mb', parameterLimit:50000}))
}


run().catch(e => console.log(e));
