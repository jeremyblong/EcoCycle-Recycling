const express = require("express");
const router = express.Router();
const Facility = require("../../../schemas/recyclingPartner/saveNewPartner.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp) => {
    console.log("running");

    const {
        facilityName,
        contactPersonName,
        contactPhoneNumber,
        uploaded,
        selected,
        facilityType,
        dropOffInstructions,
        hoursOfOperation,
        uniqueId,
        name
    } = req.body;

    const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    } = hoursOfOperation;

    const locationCoordsPoint = { 
        "type": "Point", 
        "coordinates": [ selected.otherData.position.lon, selected.otherData.position.lat ] 
    };

    const NewSavePartner = new Facility({
        facilityName,
        contactPersonName,
        contactPhoneNumber,
        contactEmail: "Unknown",
        address: {
            street: selected.otherData.address.streetName,
            city: selected.otherData.address.countrySubdivisionName,
            state: selected.otherData.address.countrySubdivisionCode,
            zip: selected.otherData.address.postalCode,
            fullAddress: selected.name,
            position: selected.otherData.position
        },
        uploaded: uploaded.map((image) => image['NaN']),
        fullAddressDetails: selected,
        facilityType,
        creator: uniqueId,
        creatorName: name,
        dropOffInstructions,
        hoursOfOperation: {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        },
        website: "Unknown", // Added website field
        uniqueId: uuidv4(),
        createdAtString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationOrganized: locationCoordsPoint
    })

    NewSavePartner.save((err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "An error occurred processing your desired request.",
                data: null
            })
        } else {
            console.log("result success: ! --- :", result);

            resppppp.json({
                message: "Successfully saved dropoff facility data!",
                data: result
            })
        }
    })
});

module.exports = router;