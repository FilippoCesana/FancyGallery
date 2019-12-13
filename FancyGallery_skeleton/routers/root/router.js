'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./root_controller.js");

router.get("/", controller.sendHomePage);

router.get("/events", controller.sendEvents);


module.exports = router;