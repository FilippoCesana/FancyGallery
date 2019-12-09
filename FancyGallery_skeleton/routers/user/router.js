'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./user_controller.js");


router.get('/search?', controller.findUser);
router.post('/', controller.createUser);
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;