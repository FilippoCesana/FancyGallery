const config = require('../../config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../../models/Image');


const search = async function (req, res, s) {
    try {
        const images = await Image.find(s);
        res.status(200).send(images);
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
};


const imageGetIdRoute = async function (req, res) {//TODO try catch
    await search(req, res, {_id: req.params.id});
};


imageSearchRoute = async function (req, res) {
    await search(req, res, req.params)
};


const imageDeleteIdRoute = async function (req, res) {
    try {
        const images = await Image.find({_id: req.params._id});
        if (images.length === 0) {//Image not found
            res.writeHead(404, {"Content-type": "text/html"});
            res.write(`<h1>Id not found</h1>`);
            res.end();
        } else {
            let tmp = images[0];
            images[0]
                .remove(function () {
                    res.status(201).json(tmp);
                })
        }
    } catch (e) {
//TODO
    }


};


const imagePostRoute = async function (req, res) {
    if (true) {//TODO CERTIFY USER
        const image = new Image({
            _id: mongoose.Type.ObjectId(),
            name: req.body.name,
            dataURL: req.body.dataURL,
            photographer: req.body.photographer
            // makerId: "testId",
            // privacy: "public"//TODO privacy get from client
        });

        try {
            const saved = await image.save();
            res.status(201).json(saved);
        } catch {
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write("Could not save in event :/");
            res.end();
        }
    } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(`<h1>Bad Request</h1>`);
        res.end();
    }
}


router.get('/image', imageGetIdRoute);
router.get('/image/search', imageSearchRoute);
router.post('/image', imagePostRoute);
router.delete('/image/:id', imageDeleteIdRoute);

module.exports = router;