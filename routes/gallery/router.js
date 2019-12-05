const config = require('../../config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Gallery = require('../../models/Gallery');


const galleryGetRoute = async function (req, res) {
    const galleries = await Gallery.find({privacy: "public"}).catch(err => console.log(err));

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(galleries));
    res.end();
};


const galleryDeleteIdRoute = async function (req, res) {
    const galleries = await Gallery.find({_id: req.params._id}).catch(err => console.log(err));

    if (galleries.length !== 1) {
        res.writeHead(404, {"Content-type": "text/html"});
        res.write(`<h1>Id not found</h1>`);
        res.end();
    } else {
        galleries[0]
            .remove(function () {
                res.writeHead(201, {"Content-type": "text/html"});
                res.write(`<h1>Gallery deleted</h1>`);
                res.end();
            })
    }
};


const galleryPostRoute = async function (req, res) {
    if (true) {//TODO CERTIFY USER
        let ok = true;
        const gallery = new Gallery({
            _id: mongoose.Type.ObjectId(),
            name: req.body.name,
            dataURL: req.body.dataURL,
            bookmarked: req.body.bookmarked ? req.body.bookmarked : "false"
        });

        const saved = await gallery.save().catch(function () {
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write("Could not save in gallery :/");
            res.end();
            ok = false;
        });

        if (ok) {
            res.writeHead(201, {"Content-Type": "application/json"});
            res.write(JSON.stringify(saved));
            res.end();
        }

    } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.write(`<h1>Bad Request</h1>`);
        res.end();
    }
};
//

router.get('/gallery', galleryGetRoute);
router.post('/gallery', galleryPostRoute);
router.delete('/gallery/:id', galleryDeleteIdRoute);
