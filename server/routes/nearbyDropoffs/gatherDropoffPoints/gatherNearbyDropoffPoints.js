const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {
    // deconstruct data...
    const { currentLoc } = req.query;

    const locationOBJ = JSON.parse(currentLoc);

    const { longitude, latitude } = locationOBJ;

    const collection = Connection.db.db("test").collection("dropoffs");

    collection.createIndex({ "newlyConstructedCoordsRandomizedNearby": "2dsphere" });

    const milesConvertedToMeters = (1609 * 2.125); // 1609 === meters in mile

    collection.find({ "newlyConstructedCoordsRandomizedNearby": {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            $maxDistance: milesConvertedToMeters,
            $minDistance: 1
        }
      }}).toArray().then((results) => {    
        console.log("results", results);

        resppppp.json({
            message: "Gathered relevant location points!",
            results
        })
    }).catch((err) => {
        console.log("err fetching - critical...:", err);

        resppppp.json({
            message: "Could not find the appropriate results...",
            err
        });
    });
});

module.exports = router;