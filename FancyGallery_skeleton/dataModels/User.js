const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");


const UserSchema = new Schema(
    {
        _id: {type: Schema.Types.ObjectId},
        dateCreated: {type: Date, default: Date.now},
        private: {
            password: {type: String, required: true}
        },
        nickname: {type: String, required: true},
        email: {type: String},
        name: {type: String},
        surname: {type: String},
        events: [{type: Schema.Types.ObjectId}],
        requests: [{type: Schema.Types.ObjectId}] //Events ids
    }
);

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');