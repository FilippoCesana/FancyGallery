const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ')

const Event = require("./../../dataModels/Event");





async function sendHomepage(req, res) {
    log("Sending homepage");
    try {
        const events = await Event.find({privacy: 'public'}).limit(3).lean();
        if (req.accepts("html")) {
            res.status(200).render("homepage", {events:events, user:req.user});
        } else {
            res.status(200).json({events:events, user:req.user});
        }
    } catch (e) {
        res.status(500).send("Error");
    }
}


async function sendEvents(req,res){
    const events = await Event.find({privacy: 'public'});
    console.log(events);
    res.status(200).json(events);
}


module.exports.sendHomePage = sendHomepage;
module.exports.sendEvents = sendEvents;