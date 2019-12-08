const express = require('express');
const path = require('path');//parsing of paths
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const dust = require('klei-dust');

//configure app
//app.use(methodOverride('_method'));
app.use(logger('dev'));// logs method of req + other info
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.text());

// configure views
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.engine('dust', dust.dust);

// Initialize routers here
const routers = require('./routes/routers');

app.use('/', routers.root);
app.use('/', routers.event);
app.use('/', routers.image);


p = new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/atelier_project')
            .then(function() {
                console.log("connection to Mongo established");
                resolve(app);
            })
            .catch((err)=> console.log(err));
    }
);

module.exports = p;