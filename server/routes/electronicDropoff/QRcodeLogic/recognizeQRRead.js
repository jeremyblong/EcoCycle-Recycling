const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {

    console.log("fuck yeah, properly ran!", req);

    const collection = Connection.db.db("test").collection("users");

    const { baseUrl } = req;

    const splitID = baseUrl.split("***")[1];

    console.log("splitID", splitID);

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            resppppp.json({
                message: "Successfully executed logic!",
                success: true
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;