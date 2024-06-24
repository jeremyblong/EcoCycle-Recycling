const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {
    // deconstruct data...
    const { dropoffID } = req.query;

    const collection = Connection.db.db("test").collection("dropoffs");
    const usersCollection = Connection.db.db("test").collection("users");

    collection.findOne({ id: dropoffID }).then((dropoff) => {
        if (!dropoff) {
            console.log("dropoff does NOT exist or could not be found.");

            resppppp.json({
                message: "dropoff does NOT exist or could not be found."
            })
        } else {

            usersCollection.findOne({ uniqueId: dropoff.postedByID }).then((user) => {
                if (!user) {
                    console.log("user does NOT exist or could not be found.");
        
                    resppppp.json({
                        message: "user does NOT exist or could not be found."
                    })
                } else {
                    resppppp.json({
                        message: "Successfully gathered dropoff!",
                        success: true,
                        user,
                        dropoff
                    })
                }
            }).catch((err) => {
                console.log(err);
        
                resppppp.json({
                    message: "Unknown error.",
                    err
                })
            });
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