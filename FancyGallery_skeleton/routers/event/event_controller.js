const Event = require('../../dataModels/Event');
const Image = require('../../dataModels/Image');
const User = require('../../dataModels/User');
const Invite = require('../../dataModels/Invite');
const mongoose = require('mongoose');

async function showMore(req, res) {
    const n = Number(req.url.split("=").pop());
    const start = n * 3;
    const end = (n + 1) * 3;
    // console.log(start,end);

    try {
        let found = await Event.find({});
        console.log(found)
        found = found.slice(start, end);
        res.status(200).json(found);


    } catch (err) {
        res.status(200).json(found)
        throw err;
    }
}

//l'obbiettivo è aggiungere un nuovo evento al databse
//ora non c'e ancora il db vedi se vuoi iniziare a setupparlo se no lo guardo io piu tardi senza problem

async function createEvent(req, res) {
    if (req.user) {//User verification
        const user = req.user;
        try {
            const event = new Event({
                name: req.body.name,
                _id: new mongoose.Types.ObjectId(),
                privacy: "public",//TODO privacy get from client
                start: req.body.start, // from the user EX : new Date('December 17, 1995 03:24:00');
                end: req.body.end,
                admin: user._id, //authorization should contain userId and password
                description: req.body.description,
                place: req.body.place,
                images: req.body.images,
                cover: req.body.cover,
                watermark: req.body.watermark,
            });

            const saved = await event.save();

            user.events.push(saved._id);//Event id added to user
            await user.save();

            res.status(201).json({event: saved, user: user});
        } catch (e) {
            console.log(e);
            if (e instanceof TypeError) {
                res.status(400).json({error: "Bad request: missing/invalid fields"});//missing required fields or invalid fields
            } else {
                res.status(500).json({error: "Could not save myEvent"})
            }
        }
    } else {
        res.status(401).json({error: "Need user credentials"})
    }
}


async function openEvent(req, res) {
    // res.render('imagesEvent', {});
    try {
        const event = await Event.findById(req.params.id).populate('images').lean();
        res.status(200).json({event: event, user: req.user})
    } catch (e) {
        if (e instanceof TypeError) {
            res.status(404).json({error: 'event not found'});
        } else {
            res.status(500).json({error: 'server error'});
        }
    }
}


//l'obbiettivo è che ti arrivi una req cons req.eventName come field che contiente il nome del evento cosi fai direttamnte la ricerca
// appena riesco faccio una middleware che ti fa sta roba almeno puoi accedere gia al campo
async function findEvent(req, res) {
    try {
        const events = await Event.find(req.params);
        res.status(200).json(events);
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
}


async function findEventById(req, res) {
    return await Event.findById(req.params.id).plain();
}


async function addImage(req, res) {
    let event;
    try {
        event = Event.findById(req.params.id);
    } catch (e) {
        res.status(500).json({error: "Our bad"});
        return;
    }

    if (!event) {
        res.status(404).json({error: "Event not found :p"});
        return;
    }
    if (!(req.user._id === event.admin || event.photographers.includes(req.user._id))) {
        res.status(403).json({error: "Permission denied"});
        return;
    }

    try {
        let image = new Image({
            dataURL: req.body.dataURL,
            photographer: req.user._id
        });
        image = await image.save();
        event.images.push(image).save();
        res.status(201).json(image);
    } catch (e) {
        res.status(500).json({error: "Our bad"});
    }

}


async function matchEvent(req, res) {
    try {
        const s = req.params.name;
        const regex = new RegExp(s, 'i')
        const events = await Event.find({name: {$regex: regex}}).lean();
        console.log(events);
        res.status(200).json(events);
    } catch (e) {
        res.status(500).json({error: "Our bad"})
    }
}


module.exports.showMore = showMore;
module.exports.createEvent = createEvent;
module.exports.openEvent = openEvent;
module.exports.findEvent = findEvent;
module.exports.addImage = addImage;
module.exports.matchEvent = matchEvent;