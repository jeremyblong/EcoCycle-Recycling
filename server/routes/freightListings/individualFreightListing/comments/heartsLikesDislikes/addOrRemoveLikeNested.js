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
        mainCommentID
    } = req.body;

    console.log("req.body................:", req.body);

    const newReactionOBJ = {
        reactorID: uniqueId,
        reactorFullName: commenterFullName,
        reactorUsername: commenterUsername,
        reactionDate: new Date(),
        id: uuidv4()
    }

    const collection = Connection.db.db("test").collection("availablefreights");

    const matchingResult = await collection.findOne({ "comments.id": mainCommentID });

    const foundIndex = matchingResult.comments.findIndex(comment => comment.id === mainCommentID);

    const checkReactionByIndex = matchingResult.comments[foundIndex].subcomments.findIndex(item => item.commenterID === uniqueId);

    const alreadyReactedIndexed = _.has(matchingResult.comments[foundIndex].subcomments[checkReactionByIndex], "alreadyReactedArr") ? matchingResult.comments[foundIndex].subcomments[checkReactionByIndex].alreadyReactedArr.findIndex(already => already.reactorID === uniqueId) : -1;

    if (alreadyReactedIndexed === -1) {
        console.log("alreadyReactedIndexed === -1 RAN...! matchingResult matchingResult matchingResult", matchingResult);
        // find and update as it doesnt exist..
        collection.findOneAndUpdate({ "comments.subcomments.id": commentID }, { $inc: {
            "comments.$.subcomments.0.likes": 1
        }, $push: { "comments.$.subcomments.0.alreadyReactedArr": newReactionOBJ }}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {
                console.log("Errrrrrrrrrrrrr ADDING...:", err);

                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {
                console.log("Successfullyyyyyyyyyyyy ADDED...:", doc);

                const { value } = doc;
                
                resppppp.json({
                    message: "Successfully 'hearted' the comment!",
                    comments: value.comments
                })
            }
        });
    } else {
        console.log("alreadyReactedIndexed === -1 did ***NOT*** run...! matchingResult matchingResult matchingResult", matchingResult);
        // ALREADY EXISTS... REMOVE!
        collection.findOneAndUpdate({ "comments.subcomments.id": commentID }, { $inc: {
            "comments.$.subcomments.0.likes": -1
        }, $pull: { "comments.$.subcomments.0.alreadyReactedArr": {
            reactorID: uniqueId
        }}}, { returnDocument: 'after' }, (err, doc) => {
            if (err) {
                console.log("Errrrrrrrrrrrrr REMOVING...:", err)
                
                resppppp.json({
                    message: "Could not find the appropriate results...",
                    err
                });
            } else {
                console.log("Successfullyyyyyyyyyyyy REMOVED...:", doc);

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