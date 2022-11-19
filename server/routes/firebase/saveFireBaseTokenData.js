const express = require("express");
const router = express.Router();
const { Connection } = require("../../mongoUtil.js");

router.post("/", (req, res) => {

    const { uniqueId, token } = req.body;

    const collection = Connection.db.db("test").collection("users");

    collection.findOneAndUpdate({ uniqueId }, { $set: { firebasePushNotificationToken: token }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {
            console.log("err with updating FCM token data....", err);

            res.json({
                message: "User could NOT be found.",
                err
            })
        } else {
            console.log("Updated the FCM firebase token DB data...:", doc);
            
            const { value } = doc;
            
            res.json({
                message: "Saved firebase token!",
                user: value
            })
        }
    })
});

module.exports = router;