const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");

router.post("/", (req, resppppp) => {
    const { 
        uniqueId,
        location,
        cartData,
        totalWeight,
        otherUser,
        listingInfo
    } = req.body;

    console.log("Accept Shipment processing facility : ", req.body);

    const collection = Connection.db.db("test").collection("users");
    
    collection.findOneAndUpdate({ uniqueId }, { $set: {

    }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {
            console.log("err with updating FCM token data....", err);

            resppppp.json({
                message: "User could NOT be found.",
                err
            })
        } else {
            console.log("Successfully accepted delivery / transfer ...:", doc);
            
            resppppp.json({
                message: "Successfully processed the shipment and accepted!"
            });
        }
    });
});

module.exports = router;