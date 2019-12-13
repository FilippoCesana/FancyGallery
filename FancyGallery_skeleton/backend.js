const log = require("debug")(":->Backend:");
const ftpServer = require("./serverftp.js");
const socket = require("socket.io")

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
        socket.on('visiting', function (eventId) {
            socket.eventId = eventId;
        })
    });
    app.set('io', io);//To be used on image post route
}


run().catch(e => console.log(e));
