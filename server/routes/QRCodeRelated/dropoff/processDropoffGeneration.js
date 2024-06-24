const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");

router.post("/", (req, resppppp) => {
    const { 
        cartDataID,
        cartData,
        weight,
        passcode,
        uniqueId
    } = req.body;

    console.log("Generate QR Code data process: ", req.body);

    const collection = Connection.db.db("test").collection("users");

    const number = Number(weight);

    console.log("Number (weight)", number);
    
    collection.findOneAndUpdate({ uniqueId, "activePendingDeliveries.id": cartDataID }, { $set: { "activePendingDeliveries.$.weight": {
        weight: number,
        measurement: "kg"
    }, "activePendingDeliveries.$.code": passcode }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {
            console.log("err with updating FCM token data....", err);

            resppppp.json({
                message: "User could NOT be found.",
                err
            })
        } else {
            console.log("Updated the value...:", doc);
            
            resppppp.json({
                message: "Successfully processed and initiated!",
                url: `${config.get("baseURL")}/fetch/dropoff/shipment/details/${cartDataID}`
            });
        }
    });
});

module.exports = router;