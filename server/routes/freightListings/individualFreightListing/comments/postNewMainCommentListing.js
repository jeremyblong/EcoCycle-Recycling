const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp) => {
    // deconstruct data...
    const { 
        uniqueId,
        commenterFullName,
        commenterUsername,
        commentText,
        listingID
    } = req.body;

    const newCommentAddition = {
        commenterID: uniqueId,
        commenterFullName,
        commenterUsername,
        commentText,
        posted: new Date(),
        postedString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        likes: 0,
        dislikes: 0,
        subcomments: []
    }

    const collection = Connection.db.db("test").collection("availablefreights");

    collection.findOneAndUpdate({ id: listingID }, { $push: { comments: newCommentAddition }}, { returnDocument: 'after' }, (err, doc) => {
        if (err) {
            
            resppppp.json({
                message: "Could not find the appropriate results...",
                err
            });
        } else {

            const { value } = doc;
            
            resppppp.json({
                message: "Submitted & posted comment successfully!",
                comments: value.comments
            })
        }
    })
});

module.exports = router;