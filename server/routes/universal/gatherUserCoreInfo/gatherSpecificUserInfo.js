const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {

    const { uniqueId } = req.query;

    const collection = Connection.db.db("test").collection("users");

    collection.findOne({ uniqueId }, { fields: { firstName: 1, lastName: 1, username: 1, email: 1, profilePictures: 1, uniqueId: 1, verificationCompleted: 1, registrationDate: 1, registrationDateString: 1, reviews: 1, totalUniqueViews: 1, stripeAccountVerified: 1, activePendingDeliveries: 1, completedDeliveries: 1, totalPalletItemsInventoryList: 1, totalPalletWeight: 1 } }).then((user) => {
        if (!user) {

            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            });
        } else {
            resppppp.json({
                message: "Gathered user successfully!",
                user
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;