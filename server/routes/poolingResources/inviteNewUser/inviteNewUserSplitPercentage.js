const express = require("express");
const router = express.Router();
const config = require("config");
const client = require('twilio')(config.get("twilioSID"), config.get("twilioAuthToken"));
const { v4: uuidv4 } = require('uuid');
const NewPooledUser = require("../../../schemas/poolingViaInvites/poolingResourcesInviteSchema.js");

router.post("/", (req, resppppp) => {

    const { data, id, signedInName } = req.body;

    const { phoneNumber } = data;

    console.log("phoneNumber", phoneNumber, `${phoneNumber.dialCode}${phoneNumber.unmaskedPhoneNumber}`);

    const codeChunk = uuidv4().split("-")[0];

    client.messages.create({
        body: `You've received an new invite to join 'ElectraCycle E-Waste Management' by ${signedInName} - You'll be given approximately ${data.percentage}% of ${signedInName}'s earnings for signing up with the code --- ${codeChunk} --- this will be automatically split/deducted via cryptocurrency (platform specific currently - can be traded). Download the app 'ElectraCycle' & enter the provided code upon signing up!`,
        from: '+18449422827',
        to: `${phoneNumber.dialCode}${phoneNumber.unmaskedPhoneNumber}`
    }).then(message => {

        console.log("message", message);

        const newData = {
            ...data,
            codeChunk,
            invitingUserID: id,
            date: new Date(),
            type: "phone"
        };

        const NewSavedInviteData = new NewPooledUser(newData);

        NewSavedInviteData.save((err, result) => {
            if (err) {
                console.log(err);

                resppppp.json({
                    message: "Error occurred while attempting to save invitation-code.",
                    err
                })
            } else {
                console.log("result", result);

                resppppp.json({
                    message: "Successfully sent invite!",
                    sid: message.sid,
                    code: codeChunk,
                    doc: result
                })
            }
        })
    }).catch((error) => {
        console.log("error", error);
    })
});

module.exports = router;