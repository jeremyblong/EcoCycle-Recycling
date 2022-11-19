const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");


router.post("/", async (req, resppppp) => {
    // deconstruct data...
    const { 
        uniqueId,
        selectedDate
    } = req.body;

    const collection = Connection.db.db("test").collection("users");

    const checkBirthdayPreviouslyModified = await collection.findOne({ uniqueId });

    if (checkBirthdayPreviouslyModified !== null) {

        if (_.has(checkBirthdayPreviouslyModified, "birthdateData") && _.has(checkBirthdayPreviouslyModified.birthdateData, "lastChanged") && checkBirthdayPreviouslyModified.birthdateData.lastChanged.count < 2) {

            console.log("1 (ONE) RAN!");
            
            const newBirthdateSubmission = {
                birthdateRaw: selectedDate,
                birthdayFormatted: moment(new Date(selectedDate)).format("MM/DD/YYYY hh:mm:ss a"),
                posted: new Date(),
                postedString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                id: uuidv4(),
                lastChanged: {
                    dateModified: new Date(),
                    count: checkBirthdayPreviouslyModified.birthdateData.lastChanged.count += 1
                }
            };

            collection.findOneAndUpdate({ uniqueId }, { $set: { birthdateData: newBirthdateSubmission }}, { returnDocument: 'after' }, (err, doc) => {
                if (err) {
                    console.log("errrrrrrrrrrrrr", err);
        
                    resppppp.json({
                        message: "Could not find/update the appropriate results...",
                        err
                    });
                } else {
                    const { value } = doc;
                    
                    resppppp.json({
                        message: "Succesfully submitted/updated birthdate data!",
                        user: value
                    })
                }
            });
        } else {

            if (_.has(checkBirthdayPreviouslyModified, "birthdateData") && _.has(checkBirthdayPreviouslyModified.birthdateData, "lastChanged") && checkBirthdayPreviouslyModified.birthdateData.lastChanged.count > 2) {
                
                console.log("2 (TWO) RAN!");

                resppppp.json({
                    message: "Already submitted/attempted TOO MANY birthdate changes! No action will be taken..."
                });
            } else {
                if (_.has(checkBirthdayPreviouslyModified, "birthdateData")) {
                    console.log("3 (THREE) RAN!");

                    resppppp.json({
                        message: "Already submitted/attempted TOO MANY birthdate changes! No action will be taken..."
                    });
                } else {
                    console.log("4 (FOUR) RAN!");

                    const newBirthdateSubmission = {
                        birthdateRaw: selectedDate,
                        birthdayFormatted: moment(new Date(selectedDate)).format("MM/DD/YYYY hh:mm:ss a"),
                        posted: new Date(),
                        postedString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                        id: uuidv4(),
                        lastChanged: {
                            dateModified: new Date(),
                            count: 1
                        }
                    };
            
                    collection.findOneAndUpdate({ uniqueId }, { $set: { birthdateData: newBirthdateSubmission }}, { returnDocument: 'after' }, (err, doc) => {
                        if (err) {
                            console.log("errrrrrrrrrrrrr", err);
                
                            resppppp.json({
                                message: "Could not find/update the appropriate results...",
                                err
                            });
                        } else {
                            const { value } = doc;
                            
                            resppppp.json({
                                message: "Succesfully submitted/updated birthdate data!",
                                user: value
                            })
                        }
                    });
                }
            }
        }
    } else {

    }
});

module.exports = router;