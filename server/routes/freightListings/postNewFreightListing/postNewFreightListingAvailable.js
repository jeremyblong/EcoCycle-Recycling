const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const moment = require("moment");
const _ = require("lodash");
const RegisterNewFreightListingAvailableSchema = require("../../../schemas/freightListingRelated/postNewFreightListing.js");

router.post("/", (req, resppppp, next) => {
    
    const { postedID, postedByName, postedByUsername, attachedImages, passedData, currentLocation } = req.body;

    const {
        description,
        freightDescription,
        packagingDescription,
        averagePalletSizeOfLoad, 
        destinationZipCode, 
        originZipCode, 
        totalWeightOfLoad,
        deliveryTimespanSpecs
    } = passedData;

    const metersToRandomize = 70;
    // currentLocation newlyConstructedCoordsRandomizedNearby
    let r = (metersToRandomize / 111300), y0 = currentLocation.latitude, x0 = currentLocation.longitude, u = Math.random(), v = Math.random(), w = r * Math.sqrt(u), t = 2 * Math.PI * v, x = w * Math.cos(t), y1 = w * Math.sin(t), x1 = x / Math.cos(y0)

    const newY = y0 + y1;
    const newX = x0 + x1;

    const newlyConstructedCoordsRandomized = { 
        "type": "Point", 
        "coordinates": [ newX, newY ] 
    };

    const newFreightListingAvailable = new RegisterNewFreightListingAvailableSchema({
        mainData: {
            description,
            freightDescription,
            packagingDescription,
            averagePalletSizeOfLoad, 
            destinationZipCode, 
            originZipCode, 
            totalWeightOfLoad,
            deliveryTimespanSpecs,
            attachedImages
        },
        newlyConstructedCoordsRandomizedNearby: newlyConstructedCoordsRandomized,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        comments: [],
        likes: 0,
        dislikes: 0,
        postedByID: postedID,
        postedByName,
        postedByUsername
    })

    newFreightListingAvailable.save((err, result) => {
        if (err) {

            console.log("error occurred...:", err);

            resppppp.json({
                message: "An error occurred while attempting to process your request...",
                err
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Successfully posted the freight listing!"
            })
        }
    });
});

module.exports = router;