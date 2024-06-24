const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../../mongoUtil.js");
const axios = require("axios");
const _ = require("lodash");

router.get("/", async (req, resppppp) => {
    // deconstruct data...
    const { uniqueId } = req.query;

    const collection = Connection.db.db("test").collection("users");

    const authenticatedUser = await collection.findOne({ uniqueId });

    console.log("authenticatedUser", authenticatedUser, req.query);

    if (authenticatedUser !== null) {
        if (typeof authenticatedUser.activePendingDeliveries !== "undefined" && authenticatedUser.activePendingDeliveries.length > 0) {
            console.log("authenticatedUser.activePendingDeliveries", authenticatedUser.activePendingDeliveries);
            resppppp.json({
                message: "Gathered data successfully!",
                dropoffs: authenticatedUser.activePendingDeliveries
            });
        } else {
            resppppp.json({
                message: "Gathered data successfully!",
                dropoffs: []
            });
        }
    } else {
        resppppp.json({
            message: "An error occurred while processing your request.",
            dropoffs: []
        });
    }
});

module.exports = router;