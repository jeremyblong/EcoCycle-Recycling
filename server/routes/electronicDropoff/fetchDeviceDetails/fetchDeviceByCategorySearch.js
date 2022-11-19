const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {

    const { query, category } = req.query;

    if (typeof query !== "undefined" && query.length === 0) {
        resppppp.json({
            message: "An error occurred while attempting to process appropriate logic..."
        })
    } else {

        if (typeof query !== "undefined" && query.length > 0) {

            const collection = Connection.db.db("test").collection(category);
            // query was included...
            collection.createIndex(
                { "Brand": "text", "Model": "text" },
                { "weights": {  "Brand": 7, "Model": 10 } }
            );
            // find related matches...
            collection.find(
                { "$text": { "$search": query.toLowerCase().trim() } },
                { "score": { "$meta": "textScore" } }
            ).sort({ "score": { "$meta": "textScore" } }).toArray().then((results) => {    
                resppppp.json({
                    message: "Successfully fetched desired results from query & category selected!",
                    results
                })
            });
        } else {
            // NO query included 
            resppppp.json({
                message: "An error occurred while attempting to process appropriate logic..."
            })
        }
    }
});

module.exports = router;