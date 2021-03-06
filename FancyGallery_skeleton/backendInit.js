const express = require('express'); //server
const path = require('path'); //utility module
// const dust_help  = require('dustjs-helpers');
const klei_dust = require('klei-dust'); // template engine
const logger = require('morgan');
// const m_override = require('method-override'); //to ovveride get/post in form se serve è da aggiungere anche in package.json
const routers = require("./routers/router_list.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const log = require("debug")(":->Backend:");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport_config");
passportConfig(passport);



 //console.log(passport)
//Punto d'ingresso dell'app lato server:
log("Init backend");

log("Express app instantiation...")
const app = express();
app.set('passport', passport);
//dust options -> useHelpers allows to use dustjs-helpers like @eq, @select ...
klei_dust.setOptions({useHelpers: true});
//set views location
log("Setting app views folder ...");
app.set('views', __dirname + '/views');

//set template engine
log("Setting app view engine ...");
app.engine('dust', klei_dust.dust); //define template engine
app.set('view engine', 'dust'); //register template engine

//middleware utilities
app.use(logger('dev'));

app.use(bodyParser.json({limit:'50mb', type: 'application/json', parameterLimit: 100000})); //parse only post data content-type = app/json
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true, parameterLimit: 100000})); //parse only post data in x-www-form...
app.use(bodyParser.text({limit:'50mb',parameterLimit: 100000})); // to access fetch body
app.use(flash());
app.use(session({
    secret: 'the cat is on the table',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.authenticate('session'));



//ROUTES
app.use("/", routers.root);
app.use("/user",routers.user);
app.use("/event", routers.event);
app.use("/auth", routers.auth);


//NO OTHER ROUTE FOUND
app.all('*', function(req, res){
  if(req.accepts("html")){
     res.status(404).render("error", {error : "404"});
  }else{
    res.status(404).json({error:'what??? This thing does not exist'});
  }
});


//it exports a promise since it waits for mongo to connect
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
