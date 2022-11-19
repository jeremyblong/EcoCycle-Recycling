const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");


router.post("/", (req, respppppp) => {

    const { id, membersIDS, conversation } = req.body;

    console.log(req.body);

    const collection = Connection.db.db("test").collection("users");

    const includeSelf = [...membersIDS, id];

    collection.updateMany({ uniqueId: { $in: includeSelf }}, { $push: { "groupConversations": conversation }}, (err, result) => {
        if (err) {
            console.log(err);

            respppppp.json({
                message: "ERROR!",
                err
            })
        } else {
            console.log("success...");

            respppppp.json({
                message: "Added members!"
            })
        }
    });
});

module.exports = router;