//È un oggetto che sa quali sono i model e li ritorna
const homepage_model = require("../models/homepage_model.js");

const models = {
    "homepage" : homepage_model
}

function getModel(model_name){
    return new Promise((resolve,reject)=>{
        //TODO: connessione al database

        //per ora
        if(models[model_name] == undefined){reject(new TypeError("NOT VALID MODEL NAME"))}
        resolve(models[model_name]);
    });
}

const modelManager = {
    getModel : getModel
}

module.exports = modelManager