const config = require('../../config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../../models/Event');


// const searchGallery = async function(){
//     return Gallery.find({privacy: "public"});
// };

const search = async function (req, res, s) {
    try {
        const events = await Event.find(s);
        res.status(200).send(events);
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
};


const eventGetRoute = async function (req, res) {//return all public events
    await search(req, res, {privacy: "public"});
};


eventSearchRoute = async function (req, res) {
    await search(req, res, req.query);
};


const eventDeleteIdRoute = async function (req, res) {
    try {
        const events = await Event.find({_id: req.params._id});
        if (events.length !== 1) {
            res.status(404).json({error: "Image ID not found"});
            res.end();
        } else {
            const tmp = events[0];
            events[0]
                .remove(function () {
                    res.status(201).json(tmp);
                })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({error: "Bad request"});
    }
};


const eventPostRoute = async function (req, res) {
    if (true) {//TODO CERTIFY USER
        try {
            const event = new Event({
                _id: mongoose.Type.ObjectId(),
                name: req.body.name,
                makerId: "testId",
                privacy: "public",//TODO privacy get from client
                start: req.body.start, // from the user EX : new Date('December 17, 1995 03:24:00');
                end: req.body.end,
                admin: req.body.authorization.userId, //authorization should contain userId and password
                description: req.body.description,
                place: req.body.place,
            });

            const saved = await event.save();
            res.status(201).json(saved);
        } catch (e) {
            console.log(e);
            if (e instanceof TypeError) {
                res.status(400).json({error: "Bad request: missing/invalid fields"});//missing required fields or invalid fields
            } else {
                res.status(500).json({error: "Could not save event"})
            }
        }
    } else {
        res.status(400).json({error:"Need user credentials"})
    }
};


router.get('/event:id', eventGetRoute);
router.get('/event/search', eventDeleteIdRoute);
router.post('/event', eventPostRoute);
router.delete('/event', eventDeleteIdRoute);

module.exports = router;