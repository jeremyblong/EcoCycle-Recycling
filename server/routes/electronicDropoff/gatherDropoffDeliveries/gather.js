const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../mongoUtil.js");
const axios = require("axios");
const _ = require("lodash");
// const { v4: uuidv4 } = require('uuid');


router.get("/", async (req, resppppp) => {
    // deconstruct data...
    const { id } = req.query;

    const collection = Connection.db.db("test").collection("users");

    const authenticatedUser = await collection.findOne({ uniqueId: id });

    if (authenticatedUser !== null) {

        console.log("authenticatedUser...:", authenticatedUser);

        const { notifications } = authenticatedUser;

        // create promise array to push pending promises into later...
        const promises = [];
        
        if (typeof notifications !== "undefined" && notifications.length > 0) {
            resppppp.json({
                message: "Gathered notifications!",
                notifications: notifications
            });
        } else {
            resppppp.json({
                message: "Gathered notifications!",
                notifications: []
            });
        }
    } else {
        console.log("NOT FOUND...:", authenticatedUser);

        resppppp.json({
            message: "User does NOT exist or could not be found.",
            err: null
        });
    };
});

module.exports = router;