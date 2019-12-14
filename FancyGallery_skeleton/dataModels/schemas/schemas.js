const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Test = new Schema({
    _id : {type: Schema.Types.ObjectId}
});

const ImageSchema = new Schema(
    {
        dataURL: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        photographer: {type: Schema.Types.ObjectId}
    }
);

module.exports.ImageSchema = ImageSchema;