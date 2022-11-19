const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const config = require("config");


router.post("/", (req, response) => {

    const collection = Connection.db.db("test").collection("users");

    const { 
        other_user,
        user,
        fullName,
        message,
        subject 
    } = req.body;

    const newNotification = {
        id: uuidv4(),
        system_date: Date.now(),
        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
        data: {
            title: `You have a new private message from ${fullName}`,
            body: `Subject: ${subject} \n \nMessage: ${message}`
        },
        from: user,
        link: "notifications"
    };

    collection.findOneAndUpdate({ uniqueId: other_user }, { $push: { notifications: newNotification }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {
            resppppp.json({
                message: "Failed to update other user's notification results - undo changes...",
                err
            });
        } else {

            const { value } = doc;

            console.log("Successfully updated/pushed new notification...:", value);

            const configgg = {
                headers: {
                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                    "Content-Type": "application/json"
                }
            }
        
            axios.post("https://fcm.googleapis.com/fcm/send", {
                "to": value.firebasePushNotificationToken,
                "notification": {
                    "title": `You have a new private message from ${fullName}`,
                    "body": subject.toString(),
                    "mutable_content": true,
                    "sound": "Tri-tone"
                },
                "data": {
                    // use company logo 
                    "url": `${config.get("logoImage")}`,
                    "dl": "notifications"
                    // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                }
            }, configgg).then((res) => {

                console.log("RES", res.data);

                response.json({
                    message: "Sent notification and message!"
                })
            }).catch((err) => {
                console.log(err);

                response.json({
                    message: "Sent notification and message!"
                })
            })
        }
    })    
});

module.exports = router;