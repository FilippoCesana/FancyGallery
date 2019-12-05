const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Test = new Schema({
    _id : {type: Schema.Types.ObjectId}
});

const ImageSchema = new Schema(
    {
        _id : {type: Schema.Types.ObjectId},
        dataURL: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        test: [Test]
    }
);

module.exports.ImageSchema = ImageSchema;