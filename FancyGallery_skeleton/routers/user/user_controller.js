const User = require('../../dataModels/User');
const mongoose = require('mongoose');
const log = require('debug')(":-> user_controller:")

async function findUser(req, res) {
    try {
        const users = await User.find(req.params);
        if (users) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json({error: "Could not find user"});
        }
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
}


async function createUser(req, res) {
    try {
        const user = new User({
            password: req.body.password,
            nickname: req.body.nickname,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
        });

        const saved = await user.save();
        if(req.accepts('text/html')){
            res.redirect('/');
        }else {
            res.status(201).json(saved);
        }
    } catch (e) {
        console.log(e);
        if (e instanceof TypeError) {
            res.status(400).json({error: "Bad request: missing/invalid fields"});//missing required fields or invalid fields
        } else {
            res.status(500).json({error: "Could not save event"})
        }
    }
}


async function deleteUser(req, res) {
    if (req.user) {
        try {
            const user = await User.findById(req.user._id);
            const tmp = user;
            user.remove(function () {
                res.status(201).json(tmp);
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({error: "Our bad"});
        }
    } else {
        res.status(403).json({error: "Permission denied"});
    }
}


// function sendLoginForm(req,res){
//    log("TODO Sending login form");
//    res.status(200).render("login",{});
// }
//
function sendSignInForm(req, res) {
    log("TODO Sending signin form");
    res.status(200).render("registration", {});
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
//module.exports.sendLoginForm = sendLoginForm;
module.exports.sendSignInForm = sendSignInForm;
