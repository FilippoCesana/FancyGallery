'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./image_controller.js");

router.get("/open", controller.openImage);


module.exports = router;