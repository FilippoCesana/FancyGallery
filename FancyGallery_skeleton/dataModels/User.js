const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");


const UserSchema = new Schema(
    {
        dateCreated: {type: Date, default: Date.now},
        password: {type: String, required: true, get: v => undefined},
        nickname: {type: String, required: true},
        email: {type: String, set: v => v.toLowerCase()},
        name: {type: String},
        surname: {type: String},
        events: [{type: Schema.Types.ObjectId}],
        requests: [{type: Schema.Types.ObjectId}] //Events ids
    }
);

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');