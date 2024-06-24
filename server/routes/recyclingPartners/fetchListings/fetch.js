const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");

router.get("/", async (req, resppppp) => {

    const { uniqueId } = req.query;

    const collection = Connection.db.db("test").collection("users");
    const partnerfacilitiesCollection = Connection.db.db("test").collection("partnerfacilities");

    const currentUserLocation = await collection.findOne({ uniqueId });

    if (currentUserLocation !== null) {

        const { latitude, longitude } = currentUserLocation.currentApproxLocation;

        const miles = 35;
        const metersInMile = 1609.34;

        const customQuery = {
            "locationOrganized": {
                $near: {
                    $geometry: {
                        type: "Point" ,
                        coordinates: [ latitude, longitude ]
                    },
                    $maxDistance: parseInt(metersInMile * miles)
                }
            }
        };

        partnerfacilitiesCollection.find({}, customQuery).toArray((err, results) => {
            if (err) {

                console.log("err", err);
    
                resppppp.json({
                    message: "An error occurred while attempting to process appropriate logic...",
                    err
                })
            } else {
                console.log("results", results);
    
                resppppp.json({
                    message: "Gathered relevant location points!",
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