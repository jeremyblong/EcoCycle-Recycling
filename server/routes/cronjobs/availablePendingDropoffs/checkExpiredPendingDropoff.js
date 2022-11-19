const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Connection } = require("../../../mongoUtil.js");

router.put("/", async (req, resppppp) => {

    console.log("req body query", req.query, req.body);
    // deconstruct data...
    const {} = req.body;

    const collection = Connection.db.db("test").collection("availableelectronicsdropoffs");

    const results = await collection.find({}).toArray();

    const listingsToRemovePromise = new Promise((resolve, reject) => {
        const objectsToRemove = [];

        const isAfter = (date1, date2) => {
            return date1 > date2;
        }

        for (let idxxxxx = 0; idxxxxx < results.length; idxxxxx++) {
            const listing = results[idxxxxx];

            const { mainData, date } = listing;

            const originalDate = new Date(moment(date).add(mainData.selectedInterval.minutes, 'minutes'));
            const checkingDate = new Date();
            
            if (isAfter(checkingDate, originalDate) === true) {

                objectsToRemove.push(listing.id);

                if ((results.length - 1) === idxxxxx) {
                    resolve(objectsToRemove);
                }
            } else {
                if ((results.length - 1) === idxxxxx) {
                    resolve(objectsToRemove);
                }
            }
        }
    });

    listingsToRemovePromise.then((arrayOfIDs) => {
        console.log("arrayOfIDs", arrayOfIDs);

        collection.deleteMany({ "id": { $in: arrayOfIDs } }, (err, values) => {
            if (err) {
                console.log(err);
    
                resppppp.json({
                    message: "Could not find/update the appropriate results...",
                    err
                });
            } else {
                console.log("values", values);

                resppppp.json({
                    message: "Successfully updated/removed the appropriate result(s)!",
                    results: values
                })
            }
        });
    })

    // const lessThanComparissonDate = moment(date).add(item.mainData.selectedInterval.minutes, 'minutes');
});

module.exports = router;