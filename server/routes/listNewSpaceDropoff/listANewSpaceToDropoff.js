const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const moment = require("moment");
const RegisterNewAvailableSpace = require("../../schemas/postNewAvailableDropoffSpace/postNewSpaceAvailability.js");
const _ = require("lodash");

router.post("/", (req, resppppp, next) => {
    
    const { storageData, signedinUserID, postedByName, postedByUsername } = req.body;

    const { mainCategory, subCategory, environmentalConditions, dropoffLocationData, environmentBuildingType, preciseMarkerCoords, description, spaceMeasurementsDimensionsFeet, contactRequiredOrNot, welcomeMessage, uploadedRelatedImages } = storageData;

    const metersToRandomize = 70;

    let r = (metersToRandomize / 111300), y0 = preciseMarkerCoords.latitude, x0 = preciseMarkerCoords.longitude, u = Math.random(), v = Math.random(), w = r * Math.sqrt(u), t = 2 * Math.PI * v, x = w * Math.cos(t), y1 = w * Math.sin(t), x1 = x / Math.cos(y0)

    const newY = y0 + y1;
    const newX = x0 + x1;

    const newlyConstructedCoordsRandomized = { 
        "type": "Point", 
        "coordinates": [ newX, newY ] 
    };

    const newStorageSave = new RegisterNewAvailableSpace({
        mainData: {
            mainCategory, 
            subCategory, 
            environmentalConditions, 
            dropoffLocationData, 
            environmentBuildingType, 
            preciseMarkerCoords, 
            description, 
            spaceMeasurementsDimensionsFeet, 
            contactRequiredOrNot, 
            welcomeMessage, 
            uploadedRelatedImages
        },
        newlyConstructedCoordsRandomizedNearby: newlyConstructedCoordsRandomized,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        alreadyCompletedDeliveries: 0,
        comments: [],
        likes: 0,
        dislikes: 0,
        postedByID: signedinUserID,
        postedByName,
        postedByUsername
    })

    newStorageSave.save((err, result) => {
        if (err) {

            console.log("error occurred...:", err);

            resppppp.json({
                message: "An error occurred while attempting to process your request...",
                err
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Submitted & posted successfully!"
            })
        }
    });
});

module.exports = router;