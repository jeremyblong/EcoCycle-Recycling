const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp) => {
    // deconstruct data...
    const { 
        uniqueId,
        commenterFullName,
        commenterUsername,
        commentText,
        listingID,
        commentID
    } = req.body;

    console.log("REqqqqqqqqqqqq.body.............:", req.body);

    const newCommentAddition = {
        commenterID: uniqueId,
        commenterFullName,
        commenterUsername,
        commentText,
        posted: new Date(),
        postedString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        likes: 0,
        dislikes: 0
    }

    const collection = Connection.db.db("test").collection("dropoffs");

    collection.findOneAndUpdate({ "comments.id": commentID }, { $push: { "comments.$.subcomments": newCommentAddition }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {

            console.log("err with posting sub-comment....", err);

            resppppp.json({
                message: "Could not find the appropriate results...",
                err
            });
        } else {
            console.log("POSTED SUB-COMMENT PROPERLY....:", doc);
            
            const { value } = doc;
            
            resppppp.json({
                message: "Submitted & posted subcomment successfully!",
                comments: value.comments
            })
        }
    })
});

module.exports = router;