const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");



const UserSchema = new Schema(
    {
        _id : {type: Schema.Types.ObjectId},
        dateCreated: {type: Date, default: Date.now},
        password:{type: String, required: true}
    }
);

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');