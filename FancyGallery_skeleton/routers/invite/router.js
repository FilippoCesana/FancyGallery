const express = require('express');
const router = express.Router();
const controller = require("./invite_controller");


router.post('/', controller.invite);
router.delete('/:id', controller.deleteInvitation);


module.exports = router;