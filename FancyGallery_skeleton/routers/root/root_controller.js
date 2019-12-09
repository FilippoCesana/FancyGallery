const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ')

const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ');
const Event = require("./../../actualSchema/Event");


async function sendHomePage(req,res){

    log("Sending homepage")

    Event.find({})
             .then(res=>{
                 const model = {
                     event_list = []
                 }
                 let event_model = {
                     name       : undefined,
                     timestamp  : undefined,
                     id         : undefined,
                    dataURL     : undefined,
                    place       : undefined
                 }

                 res.forEach(event=>{
                    event_model.name = event.name;
                    event_model.id   = event._id;
                    event_model.timestamp = event.start;
                    event_model.dataURL   = event.cover;
                    model.event_list.push(event_model);
                 });

                 
                 if(req.accepts("html")){
                    res.status(200).render("homepage", {model}).catch(err=>{throw err});
                 }else{
                    res.status(200).json(model);
                 }


             })
             .catch(err=>{
                log("Error while rendering homepage");
                res.status(500);
                res.send("Error");
                throw err;        
             })
          
}


module.exports.sendHomePage = sendHomePage;