const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");


const Test = new Schema({
    _id : {type: Schema.Types.ObjectId}
});

const GallerySchema = new Schema(
    {
        _id : {type: Schema.Types.ObjectId},
        dateCreated: {type: Date, default: Date.now},
        images: [schemas.ImageSchema],
        privacy:{type: String, required: true, default: "public"},
        makerId:{type: String}//TODO SET TO REQUIRED
    }
);

mongoose.model('Gallery', GallerySchema);
module.exports = mongoose.model('Gallery');