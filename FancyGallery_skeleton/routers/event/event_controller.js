const Event = require('../../dataModels/Event');
const Image = require('../../dataModels/Image');
const mongoose = require('mongoose');

function showMore(req, res) {
    //
}

//l'obbiettivo è aggiungere un nuovo evento al databse
//ora non c'e ancora il db vedi se vuoi iniziare a setupparlo se no lo guardo io piu tardi senza problem

async function createEvent(req, res) {
    if (true) {//TODO CERTIFY USER
        try {
            console.log("@@@@@@")
            console.log(req.body);
            const event = new Event({
                name: req.body.name,
                privacy: "public",//TODO privacy get from client
                start: req.body.start, // from the user EX : new Date('December 17, 1995 03:24:00');
                end: req.body.end,
                admin: req.body.admin, //authorization should contain userId and password
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
        res.status(400).json({error: "Need user credentials"})
    }
}


function openEvent(req, res) {

}


//l'obbiettivo è che ti arrivi una req cons req.eventName come field che contiente il nome del evento cosi fai direttamnte la ricerca
// appena riesco faccio una middleware che ti fa sta roba almeno puoi accedere gia al campo
const search = async function (req, res, s) {
    try {
        const events = await Event.find(s);
        res.status(200).json(events);
    } catch (e) {
        res.status(400).json({error: "Bad request"});
    }
};


function findEvent(req, res) {
    search(req, res, req.query.eventName);
}


async function addImage(req, res) {
    let event; //TODO check auth
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
    //TODO check Dataurl is valid
    try {


        let image = new Image({
            dataURL: req.body.dataURL,
            photographer: req.body.clientId
        });

        image = await image.save();
        event.images.push(image).save();
        res.status(201).json(image);
    }catch (e) {
        res.status(400).json({error: "TODO"});
    }

}

module.exports.showMore = showMore;
module.exports.createEvent = createEvent;
module.exports.openEvent = openEvent;
module.exports.findEvent = findEvent;