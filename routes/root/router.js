/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();

const indexRoute = function (req, res) {
    //res.render('index.dust');
    res.write("GET THIS CAT TO THE FRONT PAGE");
    res.end();
};


router.get('/', indexRoute);
/** router for /root */
module.exports = router;
