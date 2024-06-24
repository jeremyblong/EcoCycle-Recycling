const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", async (req, resppppp) => {

    const { url } = req.query;

    console.log("/gather/relevant/listing/qrcode/lookup api-request...:", url);

    const collection = Connection.db.db("test").collection("users");

    const number = url.match(/\/(\d+)$/)[1];

    console.log("number", number);

    const foundMatch = await collection.findOne({ palletNum: number });

    if (foundMatch !== null) {
        resppppp.json({
            message: "Gathered the appropriate data/listing!",
            listingInfo: {
                listingNum: number
            },
            user: foundMatch
        })
    } else {
        resppppp.json({
            message: "Unknown error occurred while processing your request.",
            err: null 
        })
    }

    // collection.findOne({ uniqueId: url }).then((user) => {
    //     if (!user) {

    //         console.log("User does NOT exist or could not be found.");

    //         resppppp.json({
    //             message: "User does NOT exist or could not be found."
    //         });
    //     } else {
    //         console.log("user user user user user user", user);

    //         resppppp.json({
    //             message: "Gathered the appropriate data/listing!",
    //             user
    //         })
    //     }
    // }).catch((err) => {
    //     console.log(err);

    //     resppppp.json({
    //         message: "Unknown error.",
    //         err
    //     })
    // })
});

module.exports = router;