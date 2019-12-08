'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./root_controller.js");

router.get("/", controller.sendHomePage);


module.exports = router;