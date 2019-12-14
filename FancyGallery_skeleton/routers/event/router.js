'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./event_controller.js");

//jaco
// router.get(/\/more&n=[0-9]+/, controller.showMore);
router.get('/search?', controller.findEvent);
//fede
router.post('/create', controller.createEvent);
router.get('/create', controller.sendEventCreateForm);

router.post('/addImage', controller.addImage);
router.get('/addImage?', controller.sendImageAddForm);

//jaco
// router.get(/\/open\?id_event=[a-zA-Z0-9]+/, controller.openEvent);
router.get('/open/:id', controller.openEvent);
// /search?event_name=Mio%20Evento

router.get('/match?',controller.matchEvent)


//fede
//router.
module.exports = router;