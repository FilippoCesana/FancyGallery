const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemas = require("./schemas/schemas");


const InvitationSchema = new Schema(
    {
        dateCreated: {type: Date, default: Date.now},
        event: {type: Schema.Types.ObjectId, ref: "Event", required: true},
        invitee: {type: Schema.Types.ObjectId, ref: "User", required: true},
        role: {type: String, required: true}
    }
);

mongoose.model('Invitation', InvitationSchema);
module.exports = mongoose.model('Invitation');