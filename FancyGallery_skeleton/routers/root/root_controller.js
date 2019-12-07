const modelManager = require('../../managers/modelManager.js');
const log = require("debug")(':-> root_controller: ')

async function sendHomePage(req,res){

    log("Sending homepage")
    try{
        if(req.accepts("html")){
            const data = await modelManager.getModel("homepage"); //TODO: connetere il modelManager con il database ora serve contenuti statici
            const model = data.event_list;
            res.status(200);
            res.render('homepage', {model});
         }else{
            res.status(200).json(model);
         }

    }catch(err){
        log("Error while rendering homepage");
        res.status(500);
        res.send("Error");
        throw err;        
    }     
}



module.exports.sendHomePage = sendHomePage;