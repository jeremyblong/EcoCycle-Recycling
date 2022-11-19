const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const accountSid = config.get("twilioSID");
const authToken = config.get("twilioAuthToken");
const client = require('twilio')(accountSid, authToken);


router.post("/", async (req, resppppp) => {
    // deconstruct data...
    const { formData, userData, authenticatedUserData } = req.body;

    const collection = Connection.db.db("test").collection("users");

    const authenticatedUser = await collection.findOne({ uniqueId: authenticatedUserData.uniqueId });

    if (authenticatedUser !== null) {

        const newNotification = {
            title: `You have a NEW drop-off request from a user (${authenticatedUserData.username} ~ ${authenticatedUserData.firstName} ${authenticatedUserData.lastName}) who'd like to deliver e-waste electronics to your storage location/house.`,
            description: `A new user is requesting to deliver e-waste electronics to your storage location/house - please respond/reply to this request within the standard time-window (24 hours) so you can orchestrate an appropriate time/place to transfer the e-waste electronics to be collected, packaged & shipped at a later point by one of our third party providers!`,
            metadata: {
                attachments: {
                    data: authenticatedUserData,
                    type: "request",
                    attachment: null
                },
                from: authenticatedUserData.uniqueId,
                other: formData
            },
            id: uuidv4(),
            date: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            seenRead: false,
            link: "dropoff-request",
            latestProfilePic: authenticatedUser.profilePictures[authenticatedUser.profilePictures.length - 1].link
        }

        const queryData = {
            $push: {
                "notifications": newNotification
            }
        };
        const returnOrNot = { returnDocument: 'after' };

        collection.findOneAndUpdate({ uniqueId: userData.uniqueId }, queryData, returnOrNot, (err, result) => {
            if (err) {
                console.log("User does NOT exist or could not be found.");

                resppppp.json({
                    message: "User does NOT exist or could not be found.",
                    err
                });
            } else {
                const { phone } = result.value;

                console.log("phone", phone);

                client.messages.create({
                    body: `You have a NEW drop-off request from a user (${authenticatedUserData.username} ~ ${authenticatedUserData.firstName} ${authenticatedUserData.lastName}) who'd like to deliver e-waste electronics to your storage location/house. Sign-in to your account & check your notification page to see your updates!`,
                    from: '+18449422827',
                    to: `+1${phone}`
                }).then(message => {

                    console.log(message.sid);
                    // return successful message response...
                    resppppp.json({
                        message: "Successfully executed logic & sent notification!",
                        success: true
                    });
                    // catch error and return
                }).catch((err) => {
                    console.log("ERRRRR sending SMS msg :", err);

                    resppppp.json({
                        message: "An error occurred while sending SMS message...",
                        err
                    });
                });
            }
        });
    } else {
        console.log("NOT FOUND...:", authenticatedUser);

        resppppp.json({
            message: "User does NOT exist or could not be found.",
            err: null
        });
    };
});

module.exports = router;