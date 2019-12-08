'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./event_controller.js");

//jaco
router.get(/\/more\?n=[0-9]+/, controller.showMore);

//fede
router.post('/create', controller.createEvent);
router.post('/:id/image', controller.createEvent);

//jaco
router.get(/\/open\?id_event=[a-zA-Z0-9]+/, controller.openEvent);

//fede bisognera togliere gli eventuali spazi bianchi
// /search?event_name=Mio%20Evento
router.get(/\/search\?event_name=([\w]+)+/, controller.findEvent);



//fede
//router.

module.exports = router;