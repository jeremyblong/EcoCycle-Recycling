const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", async (req, resppppp) => {

    const { uniqueId } = req.query;

    const collection = Connection.db.db("test").collection("users");

    const currentUserLocation = await collection.findOne({ uniqueId });

    if (currentUserLocation !== null) {

        const { latitude, longitude } = currentUserLocation.currentApproxLocation;

        const miles = 1;
        const metersInMile = 1609.34;

        const fieldQuery = { fields: { firstName: 1, lastName: 1, username: 1, email: 1, profilePictures: 1, uniqueId: 1, verificationCompleted: 1, registrationDate: 1, registrationDateString: 1, reviews: 1, totalUniqueViews: 1, stripeAccountVerified: 1, currentApproxLocation: 1 }};

        const customQuery = {
            "currentApproxLocation.geo": {
                $near: {
                    $geometry: {
                        type: "Point" ,
                        coordinates: [ latitude, longitude ]
                    },
                    $maxDistance: parseInt(metersInMile * miles)
                }
            }, fieldQuery
        };

        collection.find({ accountType: "storage-dropoff-agent-account" }, customQuery).toArray((err, results) => {
            if (err) {

                console.log("err", err);
    
                resppppp.json({
                    message: "An error occurred while attempting to process appropriate logic...",
                    err
                })
            } else {
                console.log("results", results);
    
                resppppp.json({
                    message: "Successfully executed logic!",
                    success: true,
                    results
                })
            }
        })
    } else {
        resppppp.json({
            message: "An error occurred while attempting to process appropriate logic..."
        })
    }
});

module.exports = router;