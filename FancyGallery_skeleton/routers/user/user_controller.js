const User      = require('../../dataModels/User');
const mongoose  = require('mongoose');
const log       = require('debug')(":-> user_controller:")

async function findUser(req, res) {
    try {
        const users = await User.find({nickname: req.params.nickname});
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
            private: {
                password: req.body.password
            },
            nickname: req.body.nickname,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
        });

        const saved = await user.save();
        res.status(201).json(saved);
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
    try {
        const users = await User.find({_id: req.params._id});
        if (users.length !== 1) {
            res.status(404).json({error: "User ID not found"});
            res.end();
        } else {
            const tmp = users[0];
            users[0]
                .remove(function () {
                    res.status(201).json(tmp);
                })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({error: "Bad request"});
    }
}


function sendLoginForm(req,res){
   log("TODO Sending login form");
//    res.status(200).render("login");
   
}

function sendSignInForm(req,res){
    log("TODO Sending signin form");
//    res.status(200).render("signin");
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.sendLoginForm = sendLoginForm;
module.exports.sendSignInForm = sendSignInForm;
