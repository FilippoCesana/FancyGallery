const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");


const Test = new Schema({
    _id: {type: Schema.Types.ObjectId}
});



const EventSchema = new Schema({
        _id: {type: Schema.Types.ObjectId, required:true, default: new mongoose.Types.ObjectId()},
        dateCreated: {type: Date, default: Date.now},
        start: {type: Date, required: true, default: new Date('September 11, 2069 04:20:00')}, //TODO remove default
        end: {type: Date, required: true, default: new Date('September 11, 2096 04:20:00')},
        images: [{type: Schema.Types.ObjectId, ref: "Image"}],
        privacy: {type: String, required: true, default: "public"},
        admin: {type: Schema.Types.ObjectId, required:true},
        name: {type: String, required: true},
        description: {type: String},
        place: {type: String},
        photographers:[{type: Schema.Types.ObjectId}],
        pendingPhotographers:[{type: Schema.Types.ObjectId}],//Photographers Ids
        cover:{type: String, default:"/images/default_party.jpg"},//Photographers Ids
        watermark:{type: String, default:""}//Photographers Ids
      //  guests:{type: Schema.Types.Mixed} //TODO
    }
);


mongoose.model('Event', EventSchema);
module.exports = mongoose.model('Event');
