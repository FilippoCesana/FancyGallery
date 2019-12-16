
const Event = require('../../dataModels/Event');
const Image = require('../../dataModels/Image');
const User = require('../../dataModels/User');
const Invite = require('../../dataModels/Invite');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
// const controller = require("./invite_controller");

router.get('/login', function (req, res) {
    console.log("AUTH" + req.isAuthenticated());
    if(req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});


router.get('/cookie', function (req,res) {
    res.status(200).json({headers:req.headers, authenticated: req.isAuthenticated()});
});


// router.post('/login',  passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
// }));


router.get('/logout', function (req, res) {
    req.logOut();
    res.status(301).redirect('/');
});


router.post('/login', function (req, res) {
    let passport = req.app.get('passport');
    let f = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
    });
    f(req, res);
});

module.exports = router;