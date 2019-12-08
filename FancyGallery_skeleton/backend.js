const log = require("debug")(":->Backend:");

async function run() {
    //Waits until a connection with mongo is established
    const app = await require("./backendInit");

    app.set('port', process.env.PORT || 3000);
    const server = app.listen(app.get('port'), function () {
       log('Express server listening on port ' + server.address().port);
    });
}


run().catch(e => console.log(e));