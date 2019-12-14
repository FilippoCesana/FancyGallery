const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ')

const Event = require("./../../dataModels/Event");


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

function formatEvent(events){
   let tmp = events;
    tmp.forEach(event=>{
        let toFormat  = event.start;
        toFormat = toFormat.toString().split(" ");
         toFormat.shift();
        const month = toFormat.shift();
        const day = toFormat.shift();
        const year = toFormat.shift();
        
        event.start = formatDate(month,day,year);

    });
    return tmp;
}


async function sendHomepage(req, res) {
    log("Sending homepage");
    try {
        
        let events = await Event.find({privacy: 'public'}).limit(3).lean();
        
        events = formatEvent(events);
        
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
    try{
        let events = await Event.find({privacy: 'public'}).lean();
       
        events = formatEvent(events);
        console.log(events)
    if(req.user){
        const user  = events.filter(event=>{
            
            return event.admin.toString() == req.user._id.toString();
        });
      
        res.status(200).json({events:events,user:user});
    }else{
        res.status(200).json({events:events,user:undefined});
    }
    }catch(err){
        throw err;
    }
    
   
}


module.exports.sendHomePage = sendHomepage;
module.exports.sendEvents = sendEvents;