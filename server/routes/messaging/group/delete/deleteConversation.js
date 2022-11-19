const express = require("express");
const router = express.Router();
const config = require("config");
const cors = require('cors');
const { Connection } = require("../../../../mongoUtil.js");

router.put("/", (req, res) => {

    const { guid, group, id } = req.body;

    const collection = Connection.db.db("test").collection("users");

    const combined = [];

    for (let index = 0; index < group.length; index++) {
        const user = group[index];
        combined.push(user.uid);
    }

    collection.updateMany({ uniqueId: { $in: [ ...combined ]}}, { $pull: { "groupConversations": { "guid": guid }}}, (err, result) => {
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