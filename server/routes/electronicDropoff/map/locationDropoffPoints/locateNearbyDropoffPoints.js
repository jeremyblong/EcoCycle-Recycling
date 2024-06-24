const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../../mongoUtil.js");
const { isNumber } = require("lodash");

router.get("/", async (req, resppppp) => {

    const { uniqueId, region } = req.query;

    console.log("region", region);
    const collection = Connection.db.db("test").collection("users");
    const collectionDropoffs = Connection.db.db("test").collection("dropoffs");

    const currentUserLocation = await collection.findOne({ uniqueId });

    if (typeof region !== "undefined" || region !== null && isNumber(region)) {
        const parsedRegion = JSON.parse(region);

        console.log("region", parsedRegion.longitude)

        if (currentUserLocation !== null) {
    
            const miles = 10;
            const metersInMile = 1609.34;
    
            const customQuery = {
                "newlyConstructedCoordsRandomizedNearby": {
                    $near: {
                        $geometry: {
                            type: "Point" ,
                            coordinates: [ parsedRegion.longitude, parsedRegion.latitude ]
                        },
                        $maxDistance: parseInt(metersInMile * miles)
                    }
                }
            };
    
            collectionDropoffs.find(customQuery).toArray((err, results) => {
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
    } else {
        if (currentUserLocation !== null) {

            const { coordinates } = currentUserLocation.currentApproxLocation.geo;
    
            const miles = 10;
            const metersInMile = 1609.34;
    
            const customQuery = {
                "newlyConstructedCoordsRandomizedNearby": {
                    $near: {
                        $geometry: {
                            type: "Point" ,
                            coordinates: [ coordinates[1], coordinates[0] ]
                        },
                        $maxDistance: parseInt(metersInMile * miles)
                    }
                }
            };
    
            collectionDropoffs.find(customQuery).toArray((err, results) => {
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
    }
});

module.exports = router;