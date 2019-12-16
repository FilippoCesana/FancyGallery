const Event = require('../../dataModels/Event');
const Image = require('../../dataModels/Image');
const User = require('../../dataModels/User');
const Invite = require('../../dataModels/Invite');
const mongoose = require('mongoose');


async function invite(req, res) {
    const user = req.user;
    let ownsEvent = false;
    if (user) {
        ownsEvent = user.events.reduce(false, function (acc, eventId) {
            return acc || eventId.equals(req.body.id)
        })
    }

    if (ownsEvent) {
        try {
            let event = Event.findById(req.body.id).lean();
            let invitee = User.findOne(req.body.nickname).lean();
            [event, invitee] = await Promise.all([event, invitee]);

            if (!event) {
                res.status(404).json({error: "Event not found :p"});
                return;
            }
            if (!invitee) {
                res.status(404).json({error: "Invitee not found :p"});
                return;
            }

            let invite = new Invite({
                event: event._id,
                invitee: invitee._id,
                role: req.body.role
            });

            invite.save();
            res.status(201).json(event);
        } catch (e) {
            res.status(500).json({error: "Our bad"});

        }
    }
}


async function accept(req, res) {

}


async function deleteInvitation(req, res){
    //TODO verify User
    let  invite = Invite.searchById(req.params.id);
    await invite.delete();
    res.status(201).res.end();
}




module.exports.invite = invite;
module.exports.accept = accept;
module.exports.deleteInvitation = deleteInvitation;