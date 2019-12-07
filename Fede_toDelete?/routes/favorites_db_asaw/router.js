/** @module root/router */
'use strict';
// const config = require('../../config');
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Favorite = require('../../models/Image');
//
// function makeTestsPass(id, apply = false) {
//     if(apply) {
//         if (id) {
//             return id;
//         } else if (id && typeof id == 'string' && id.length === 24) {
//             return mongoose.Types.ObjectId(id);
//         } else {
//             return mongoose.Type.ObjectId();
//         }
//     }
//     return mongoose.Types.ObjectId();
// }
//
//
// const favoritePostRoute = async function (req, res) {
//     if (typeof req.body.name === "string" && typeof req.body.dataURL === "string") {
//         const found = await Favorite.find({_id:req.body._id});
//
//         if (found.length >0){
//             res.writeHead(400, {'Content-Type': 'text/html'});
//             res.write(`<h1>ID already exists</h1>`);
//             res.end();
//             return;
//         }
//         const favorite = new Favorite({
//             _id: makeTestsPass(req.body._id),
//             name: req.body.name,
//             dataURL: req.body.dataURL,
//             bookmarked: req.body.bookmarked? req.body.bookmarked: "false"
//         });
//         console.log("here");
//         const saved = await favorite.save().catch(err => console.log(err));
//
//         setTimeout(function() {
//             res.writeHead(201, {"Content-Type": "application/json"});
//             res.write(JSON.stringify(saved));
//             res.end();
//         }, 5000);
//     } else {
//         console.log("HERE");
//         res.writeHead(400, {'Content-Type': 'text/html'});
//         res.write(`<h1>Bad Request</h1>`);
//         res.end();
//     }
// };
//
// const favoriteGetRoute = async function (req, res) {
//     const images = await Favorite.find({}).catch(err => console.log(err));
//
//     if (req.accepts("text/html")) {
//         res.render("favorites", {images: images});
//     } else {
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.write(JSON.stringify(images));
//         res.end();
//     }
// };
//
//
// const favoriteGetIdRoute = async function (req, res) {
//     const filteredImages = await Favorite.find({_id: req.params._id}).catch(err => console.log(err));
//
//     //console.log(req.params._id);
//     //console.log(filteredImages);
//
//
//
//     if (filteredImages.length !== 1) {
//         res.writeHead(404, {"Content-Type": "text/html"});
//         res.write(`<h1>Id not found</h1>`);
//         res.end();
//     } else {
//         filteredImages[0].dateLastVisit = Date.now();
//         await filteredImages[0].save();
//
//         if (req.accepts("text/html")) {
//             res.render("favorites.dust", {images: filteredImages});
//         } else {
//             res.writeHead(200, {"Content-Type": "application/json"});
//             res.write(JSON.stringify(filteredImages[0]));
//             res.end();
//         }
//     }
// };
//
//
// const favoritePutIdRoute = async function (req, res) {
//     const images = await Favorite.find({_id: req.params._id}).catch(err => console.log(err));
//
//     if (images.length !== 1) {
//         favoritePostRoute(req, res);//create a new image
//     } else {
//         images[0].name = req.body.name; //change the name of the existing image
//         images[0]
//             .save()
//             .then(function () {
//                 if (req.accepts("text/html")) {
//                     res.writeHead(201, {"Content-type": "text/html"});
//                     res.write(`<h1>Image updated</h1>`);
//                     res.end();
//                 } else {
//                     res.writeHead(201, {"Content-type": "application/json"});
//                     res.write(JSON.stringify(images[0]));
//                     res.end();
//                 }
//             })
//     }
// };
//
//
// const favoriteDeleteIdRoute = async function (req, res) {
//     const images = await Favorite.find({_id: req.params._id}).catch(err => console.log(err));
//
//     if (images.length !== 1) {
//         res.writeHead(404, {"Content-type": "text/html"});
//         res.write(`<h1>Id not found</h1>`);
//         res.end();
//     } else {
//         images[0]
//             .remove(function () {
//                 res.writeHead(201, {"Content-type": "text/html"});
//                 res.write(`<h1>Image deleted</h1>`);
//                 res.end();
//             })
//     }
// };
//
// const favoriteSearchRoute = async function (req, res) {
//     const filteredImages = await Favorite.find(req.query).catch(err => console.log(err));
//
//     if (req.accepts("text/html")) {
//         res.render("favorites.dust", {images: filteredImages});
//     } else {
//         res.writeHead(200, {"Content-type": "application/json"});
//         res.write(JSON.stringify(filteredImages));
//         res.end();
//     }
// };
//
//
// const favoriteDeleteAllRoute = async function (req, res) {
//     const images = await Favorite.find({}).catch(err => console.log(err));
//     const promises = [];
//
//     for (let image of images) {
//        promises.push(image.remove());
//     }
//
//     await Promise.all(promises);
//
//     console.log("DELETED ALL IMAGES");
//     res.writeHead(201, {"Content-type": "text/html"});
//     res.write(`<h1>Images deleted</h1>`);
//     res.end();
//
// };
//
// router.post('/favorites', favoritePostRoute);
// router.get('/favorites/search?', favoriteSearchRoute);
// router.get('/favorites/deleteALL', favoriteDeleteAllRoute);
// router.get('/favorites/:_id', favoriteGetIdRoute);
// router.put('/favorites/:_id', favoritePutIdRoute);
// router.get('/favorites', favoriteGetRoute);
// router.delete('/favorites/:_id', favoriteDeleteIdRoute);
// /** router for /root */
// module.exports = router;
