const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");

router.get("/", async (req, resppppp) => {
    const { 
        code,
        url
    } = req.query;

    console.log("READ QR Code data process: ", req.query);

    const collection = Connection.db.db("test").collection("users");
    
    const foundMatch = await collection.findOne({ "activePendingDeliveries.code": code });

    console.log("foundMatch", foundMatch);
    // check IF the code matches any of the codes in the user profile...:
    if (foundMatch !== null) {
        // matching directory/code - now find the data:
        const foundListingIndex = foundMatch.activePendingDeliveries.findIndex((item) => item.code === code);
        // decontruct various properties and values
        const foundListing = foundMatch.activePendingDeliveries[foundListingIndex];
        const newWeightAmount = foundListing.weight.weight;
        const cartItems = foundListing.cartData;

        if (foundListing) {
            collection.findOneAndUpdate({ "activePendingDeliveries.code": code }, { $push: {
                completedDeliveries: foundListing,
                totalPalletItemsInventoryList: {
                    $each: cartItems
                }
            }, $inc: {
                totalPalletWeight: newWeightAmount
            }, $pull: {
                activePendingDeliveries: {
                    code
                }
            }}, { returnDocument: 'after' }, (err, doc) => {
                if (err) {
                    console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrror like ==> :", err);
    
                    resppppp.json({
                        message: "Could not find the appropriate results...",
                        err
                    });
                } else {
                    console.log("Successfullyyyyyyyyyyyy thumbed-up...:", doc);
    
                    const { value } = doc;
                    
                    resppppp.json({
                        message: "Successfully processed and initiated!"
                    });
                }
            });
        } else {
            resppppp.json({
                message: "Could not find the appropriate results...",
                err: null
            });
        }
    } else {
        resppppp.json({
            message: "Successfully processed and initiated!"
        });
    }
});

module.exports = router;