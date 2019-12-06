const config = require('../../config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../../models/Image');

const imageGetRoute = async function (req, res) {
    const images = await Image.find({privacy: "public"}).catch(err => console.log(err));
    res.status(200).send(image);
};


const imageDeleteIdRoute = async function (req, res) {
    const images = await Image.find({_id: req.params._id}).catch(err => console.log(err));

    if (images.length === 0) {//Image not found
        res.writeHead(404, {"Content-type": "text/html"});
        res.write(`<h1>Id not found</h1>`);
        res.end();
    } else {
        let tmp = galleries[0];
        galleries[0]
            .remove(function () {
                res.status(201).json(tmp);
            })
    }
};


const imagePostRoute = async function (req, res) {
    if (true) {//TODO CERTIFY USER
        let ok = true;

        const image = new Image({
            _id: mongoose.Type.ObjectId(),
            name: req.body.name,
            dataURL: req.body.dataURL,
            photographer: req.body.photographer
           // makerId: "testId",
           // privacy: "public"//TODO privacy get from client
        });

        const saved = await image.save().catch(function () {
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write("Could not save in event :/");
            res.end();
            ok = false;
        });

        if (ok) {
            res.status(201).json(saved);
        }

    } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(`<h1>Bad Request</h1>`);
        res.end();
    }
};


imageSearchRoute = async function (req, res) {
    const filteredGalleries = await Image.find(req.query).catch(err => console.log(err));
    res.status(200).json(filteredGalleries) //TODO check if equivalent
};


router.get('/image', imageGetRoute);
router.get('/image/search', imageSearchRoute);
router.post('/image', imagePostRoute);
router.delete('/image/:id', imageDeleteIdRoute);

module.exports = router;