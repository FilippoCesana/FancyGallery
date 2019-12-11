const express = require('express'); //server
const path = require('path'); //utility module
// const dust_help  = require('dustjs-helpers');
const klei_dust = require('klei-dust'); // template engine
const logger = require('morgan');
// const m_override = require('method-override'); //to ovveride get/post in form se serve è da aggiungere anche in package.json
const routers = require("./routers/router_list.js");
const mongoose = require('mongoose');
const b_parse = require('body-parser');
const log = require("debug")(":->Backend:");

const watermark = require("watermarkjs");


//Punto d'ingresso dell'app lato server:
log("Init backend");

log("Express app instantiation...")
const app = express();

//dust options -> useHelpers allows to use dustjs-helpers like @eq, @select ...
klei_dust.setOptions({useHelpers: true});
//set views location
log("Setting app views folder ...")
app.set('views', __dirname + '/views');

//set template engine
log("Setting app view engine ...")
app.engine('dust', klei_dust.dust); //define template engine
app.set('view engine', 'dust'); //register template engine

//middleware utilities
app.use(logger('dev'));
app.use(b_parse.json({type: 'application/json'})) //parse only post data content-type = app/json
app.use(b_parse.text()); // to access fetch body
app.use(b_parse.urlencoded({extended: true})); //parse only post data in x-www-form...


//set path for static files
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", routers.root);

app.use("/user",routers.user);

app.use('/event', routers.event);

app.use('/image',routers.image);

app.get('*', function(req, res){
    res.status(404).json({error:'what??? This thing does not exist'});
});

p = new Promise(function (resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/atelier_project',{useUnifiedTopology: true,useNewUrlParser:true})
            .then(function () {
                log("connection to Mongo established");
                resolve(app);
            })
            .catch((err) => console.log(err));
    }
);


module.exports = p;
