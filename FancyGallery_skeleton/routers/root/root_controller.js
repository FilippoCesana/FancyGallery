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
    if(req.user){
        const user  = events.filter(event=>{
            
            return event.admin.toString() == req.user._id.toString();
        });
        console.log(user);
        res.status(200).json({events:events,user:user});
    }else{
        res.status(200).json({events:events,user:undefined});
    }
   
}


module.exports.sendHomePage = sendHomepage;
module.exports.sendEvents = sendEvents;