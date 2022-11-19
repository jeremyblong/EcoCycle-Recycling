const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const _ = require("lodash");

router.post("/", async (req, resppppp) => {

    const { 
        uniqueId,
        reactorFullName,
        reactorUsername,
        listingID
    } = req.body;

    const newReactionOBJ = {
        reactorID: uniqueId,
        reactorFullName,
        reactorUsername,
        reactedDate: new Date(),
        id: uuidv4(),
        reaction: "dislikes"
    }

    const collection = Connection.db.db("test").collection("availablefreights");

    const matchingResult = await collection.findOne({ id: listingID });

    const indexedMatch = _.has(matchingResult, "alreadyReactedArr") ? matchingResult.alreadyReactedArr.findIndex(item => item.reactorID === uniqueId) : -1;

    if (indexedMatch === -1) {
        collection.findOneAndUpdate({ id: listingID }, { $inc: {
            dislikes: 1
        }, $push: { alreadyReactedArr: newReactionOBJ }}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {

                console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrror dislike ==> :", err);

                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {

                console.log("Successfullyyyyyyyyyyyy thumbed-down...:", doc);

                const { value } = doc;
                
                resppppp.json({
                    message: "Successfully 'thumbed-down' the comment!",
                    listing: value
                })
            }
        });
    } else {

        const selectedPreviousReaction = matchingResult.alreadyReactedArr[indexedMatch].reaction;

        collection.findOneAndUpdate({ id: listingID }, { $inc: {
            [selectedPreviousReaction]: -1
        }, $pull: { alreadyReactedArr: {
            reactorID: uniqueId
        }}}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {

                console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrror dislike ==> :", err);

                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {

                console.log("Successfullyyyyyyyyyyyy thumbed-down...:", doc);

                const { value } = doc;
                
                resppppp.json({
                    message: "Successfully removed-previous 'thumbed-down' the comment!",
                    listing: value
                })
            }
        });
    }
});

module.exports = router;