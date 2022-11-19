const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const RegisterNewAvailablePickupDelivery = require("../../../schemas/newAvailableElectronicPickups/postNewAvailablePickup.js");
const _ = require("lodash");

router.post("/", (req, resppppp, next) => {
    
    const { 
        authData,
        currentlySelected,
        selectedInterval,
        distanceAndDuration,
        calculateValuePerMile
    } = req.body;

    const { firstName, lastName, uniqueId, username } = authData;

    const newPostPostedByName = `${firstName} ${lastName}`;
    const newPostPostedByUsername = username;

    const originalMainData = currentlySelected.mainData;

    const { _id, date, dateString, id, alreadyCompletedDeliveries, postedByID, postedByName, postedByUsername, newlyConstructedCoordsRandomizedNearby } = currentlySelected;

    const newStorageSave = new RegisterNewAvailablePickupDelivery({
        mainData: {
            originalListingMainData: originalMainData,
            selectedInterval,
            distanceAndDuration,
            totalCostEstimated: calculateValuePerMile,
            _id, 
            date, 
            dateString, 
            id, 
            alreadyCompletedDeliveries, 
            postedByID, 
            postedByName, 
            postedByUsername, 
            newlyConstructedCoordsRandomizedNearby,
            alreadyAccepted: false,
            latestAvailableSelectionTimeDate: moment(new Date()).add(selectedInterval.minutes, 'minutes'),
            latestAvailableSelectionTimeDateString: moment(new Date()).add(selectedInterval.minutes, 'minutes').format("MM/DD/YYYY hh:mm")
        },
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        newPostPostedByID: uniqueId,
        newPostPostedByName,
        newPostPostedByUsername
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
                message: "Successfully added item to queue!",
                listing: result
            })
        }
    });
});

module.exports = router;