const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ')

const Event = require("./../../dataModels/Event");


// async function sendHomePage(req,res){
//
//     log("Sending homepage")
//
//     Event.find({})
//              .then(r=>{
//                //  console.log(r);
//                  const model = {
//                      event_list : []
//                  }
//
//
//                  r.forEach(event=>{
//                      let event_model = {};
//                     event_model.name = event.name;
//                     event_model.id   = event._id;
//                     event_model.timestamp = event.start;
//                     event_model.dataURL   = event.cover;
//                     event_model.place     = event.place;
//                     model.event_list.push(event_model);
//                  });
//
//                  //console.log(model);
//
//                  model.event_list = model.event_list.slice(0,3);
//                  if(req.accepts("html")){
//                     res.status(200).render("homepage", {model});
//                  }else{
//                     res.status(200).json(model);
//                  }
//
//              })
//              // Nicola ha modificato risposta error con dust
//              //throw err;
//              .catch(err=>{
//                 log("Error while rendering homepage");
//                 if(req.accepts("html")){
//                    res.status(500).render("error", {error : "500"});
//                 }else{
//                   res.status(500).send("Error");
//                 }
//              })
//
// }


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


module.exports.sendHomePage = sendHomepage;
