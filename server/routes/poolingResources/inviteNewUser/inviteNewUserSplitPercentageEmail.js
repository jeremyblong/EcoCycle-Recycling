const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");
const client = require('twilio')(config.get("twilioSID"), config.get("twilioAuthToken"));
const { v4: uuidv4 } = require('uuid');
const NewPooledUser = require("../../../schemas/poolingViaInvites/poolingResourcesInviteSchema.js");
const transporter = require("../../../controllers/nodemailer/transportConfig.js");
const { sendEmailInvite } = require("./emailTemplate/email.js");

router.post("/", async (req, resppppp) => {

    const { data, id, signedInName } = req.body;

    const codeChunk = uuidv4().split("-")[0];

    const mailOptions = sendEmailInvite(data, codeChunk, signedInName);

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // error
            console.log("error!", error);

            resppppp.json({ success: false, message: "Successfully sent invite!", info, error });
        } else {
            // success
            console.log("successfully sent email ! : ", info);

            const newData = {
                ...data,
                email: data.email.toLowerCase().trim(),
                codeChunk,
                invitingUserID: id,
                date: new Date(),
                type: "email"
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

                    resppppp.json({ success: true, message: "Successfully sent invite!", info, error: null, result });
                }
            })
        }
    });
});

module.exports = router;