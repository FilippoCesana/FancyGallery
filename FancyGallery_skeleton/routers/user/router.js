'use strict';
const express = require('express');
const router = express.Router();
const controller = require("./user_controller.js");


router.get('/search?', controller.findUser);
router.post('/', controller.createUser);
router.delete('/delete/:id', controller.deleteUser);

router.get("/login", controller.sendLoginForm);

router.get("/signin", controller.sendSignInForm);

module.exports = router;