const config = require('../../config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../../models/Event');


// const searchGallery = async function(){
//     return Gallery.find({privacy: "public"});
// };

const searchRoute = async function (req, res, s) {
    try {
        const events = await Event.find(s);
        res.status(200).send(events);
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
};


const eventGetRoute = async function (req, res) {//return all public events
    await searchRoute(req, res, {privacy: "public"});
};


eventSearchRoute = async function (req, res) {
   await searchRoute(req, res, req.query);
};


const eventDeleteIdRoute = async function (req, res) {
    try {
        const galleries = await Event.find({_id: req.params._id});
        if (galleries.length !== 1) {
            res.status(404).json({error: "Image ID not found"});
            res.end();
        } else {
            galleries[0]
                .remove(function () {
                    res.writeHead(201, {"Content-type": "text/html"});
                    res.write(`<h1>Gallery deleted</h1>`);
                    res.end();
                })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({error: "Bad request"});

    }

};


const eventPostRoute = async function (req, res) {
    if (true) {//TODO CERTIFY USER
        const gallery = new Event({
            _id: mongoose.Type.ObjectId(),
            name: req.body.name,
            makerId: "testId",
            privacy: "public"//TODO privacy get from client
        });

        try {
            const saved = await gallery.save();
            res.status(201).json(saved);
        } catch (e) {
            console.log(e);
            res.status(500).json({error: "Could not save in event"})
        }
    } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(`<h1>Bad Request</h1>`);
        res.end();
    }
};


router.get('/event', eventGetRoute);
router.get('/event/search', eventDeleteIdRoute);
router.post('/event', eventPostRoute);
router.delete('/event', eventDeleteIdRoute);

module.exports = router;