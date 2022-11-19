const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.put("/", (req, res) => {

    const { guid, id } = req.body;

    const collection = Connection.db.db("test").collection("users");

    collection.updateOne({ uniqueId: id }, { $pull: { "groupConversations": { "guid": guid }}}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result", result);

            res.json({
                message: "Deleted conversation!"
            })
        }
    });
});

module.exports = router;