const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const _ = require("lodash");


router.post("/", async (req, resppppp) => {
    // deconstruct data...
    const { 
        uniqueId,
        commenterFullName,
        commenterUsername,
        commentID,
        listingID
    } = req.body;
    
    console.log("req.body req.body req.body", req.body);

    const newReactionOBJ = {
        reactorID: uniqueId,
        reactorFullName: commenterFullName,
        reactorUsername: commenterUsername,
        reactionDate: new Date(),
        id: uuidv4()
    }

    const collection = Connection.db.db("test").collection("dropoffs");

    const matchingResult = await collection.findOne({ "comments.id": commentID });

    console.log("matchingResult", matchingResult);

    const foundIndex = matchingResult.comments.findIndex(comment => comment.id === commentID);

    const checkReactionByIndex = _.has(matchingResult.comments[foundIndex], "alreadyReactedArr") ? matchingResult.comments[foundIndex].alreadyReactedArr.findIndex(item => item.reactorID === uniqueId) : -1;

    console.log("checkReactionByIndex ... :", checkReactionByIndex);

    if (checkReactionByIndex === -1) {
        console.log("checkReactionByIndex === -1 RAN...!");
        // find and update as it doesnt exist..
        collection.findOneAndUpdate({ "comments.id": commentID }, { $inc: {
            "comments.$.likes": 1
        }, $push: { "comments.$.alreadyReactedArr": newReactionOBJ }}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {
                console.log("Errrrrrrrrrrrrrrrrrrrrrrrr (inner) :", doc);
                
                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {
                console.log("Successfullyyyyyyyyyyyy added...:", doc);

                const { value } = doc;
                
                resppppp.json({
                    message: "Successfully 'hearted' the comment!",
                    comments: value.comments
                })
            }
        });
    } else {
        console.log("checkReactionByIndex === -1 did ***NOT*** run...!");
        // ALREADY EXISTS... REMOVE!
        collection.findOneAndUpdate({ "comments.id": commentID }, { $inc: {
            "comments.$.likes": -1
        }, $pull: { "comments.$.alreadyReactedArr": {
            reactorID: uniqueId
        }}}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {
                console.log("Errrrrrrrrrrrrr removing...:", err)
                
                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {
                console.log("Successfullyyyyyyyyyyyy removed...:", doc);

                const { value } = doc;
                
                resppppp.json({
                    message: "Successfully removed 'hearted' reaction from comment!",
                    comments: value.comments
                })
            }
        })
    }
});

module.exports = router;