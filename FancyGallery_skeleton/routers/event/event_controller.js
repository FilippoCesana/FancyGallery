const Event = require('../../dataModels/Event');
const Image = require('../../dataModels/Image');
const User = require('../../dataModels/User');
const Invite = require('../../dataModels/Invite');
const mongoose = require('mongoose');

// async function showMore(req, res) {
//     const n = Number(req.url.split("=").pop());
//     const start = n * 3;
//     const end = (n + 1) * 3;
//     // console.log(start,end);
//
//     try {
//         let found = await Event.find({});
//         console.log(found)
//         found = found.slice(start, end);
//         res.status(200).json(found);
//
//
//     } catch (err) {
//         res.status(200).json(found)
//         throw err;
//     }
// }

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



//ONLY FOR TESTING
const photos = [
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
    {
        id_image        : "1234IDIMAGE",
        id_photographer : "testID",
        timestamp       : "4:40",
        dataURL         : "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png"
    },
]

function formatDate(month,day,year){
    const months = {
        jan : "january",
        feb : "february",
        mar : "march",
        apr : "april",
        jun : "june",
        jul : "july",
        aug : "august",
        sep : "september",
        oct : "october",
        nov : "november",
        dec : "december",
    }

    

    return  day + " " + months[month.toLowerCase()] + " " + year;
}



async function openEvent(req, res) {
    // res.render('imagesEvent', {});
    try {
        const id = req.params.id;
        const event = await Event.findById(id).populate('images').lean();
        //console.log(event)
        let canPost = false;
        if(req.user) {
            console.log(typeof req.user._id, typeof event.admin)
            console.log(req.user._id, event.admin)
        }
        if(req.user && req.user._id.equals(event.admin)){
            canPost = true;
        }
        console.log(canPost);

        const toFormat = event.start.toString().split(" ");
        toFormat.shift()
        const month = toFormat.shift();
        const day = toFormat.shift();
        const year = toFormat.shift();
        event.start = formatDate(month,day,year);
        // const model = {
        //     event_detail : {},
        //     photo_list   : photos
        // }
        // model.event_detail["name"]      = event.name;
        // model.event_detail["place"]     = event.place;
        // model.event_detail["timestamp"] = event.start;
        // model.event_detail["data"]      = event.cover;
        // model.event_detail
        // res.status(200).render("imagesEvent",{model})
        res.status(200).render("imagesEvent", {event: event, user: req.user, canPost: canPost})
    } catch (e) {
        console.log(e)
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


async function sendImageAddForm(req, res){
    res.status(200).render('picture_upload',{});
}


async function addImage(req, res) {
    let event;
    try {
        event = await Event.findById(req.body.eventId);
    } catch (e) {
        res.status(500).json({error: "Our badd"});
        return;
    }

    //console.log("@@@@@@@@", event._id);
    if (!event) {
        res.status(404).json({error: "Event not found :p"});
        return;
    }

    if (!req.user) {
        res.status(403).json({error: "Permission denied: user not logged"});
        return;
    }
    else{
        //|| event.photographers.includes(req.user._id)) TODO
        if (!(req.user._id.equals(event.admin))) {
            res.status(403).json({error: "Permission denied"});
            return;
        }
    }


    try {
        let image = new Image({
            dataURL: req.body.dataURL,
            photographer: req.user._id
        });
        image = await image.save();
        await event.images.push(image._id);
        event.save();
        //We grab all the sockets that are connected to the specific event and send the new image data
       // req.app.get('io').to(event._id).emit('newImage', image);
        res.status(201).json(image);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: "Our bad"});
    }

}


async function modifyEvent(req, res) {
    const event = Event.findById(req.params.id);

}


function sendEventCreateForm(req, res){
    res.status(200).render('new_gallery', {user:req.user});
}

async function matchEvent(req, res) {
    try {
        const regex = new RegExp(req.query.name, 'i')
        let events;
        if (req.query.name) {
            events = await Event.find({name: {$regex: regex}}).limit(20).lean();
        } else {
            events = await Event.find({}).limit(20).lean();
        }
        res.status(200).json(events);
        console.log(events.length)
    } catch (e) {
        res.status(500).json({error: "Our bad"})
    }
}




function filter(req,res) {
    console.log(req.params.id);
    res.end();
}



// module.exports.showMore   = showMore;
module.exports.createEvent= createEvent;
module.exports.openEvent  = openEvent;
module.exports.findEvent  = findEvent;
module.exports.addImage   = addImage;
module.exports.matchEvent = matchEvent;
module.exports.filter      = filter;
module.exports.sendEventCreateForm = sendEventCreateForm;
module.exports.sendImageAddForm = sendImageAddForm;

