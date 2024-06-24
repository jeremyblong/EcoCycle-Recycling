const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.get("/", (req, resppppp) => {
    
    const { 
        uniqueId
    } = req.query;

    console.log("Req.query", req.query);

	const collection = Connection.db.db("test").collection("users");

    collection.findOne({ uniqueId }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const stripeID = user.stripeAccountDetails.id;

            try {
                const balance = await stripe.balance.retrieve({
                    stripeAccount: stripeID
                });

                console.log("balance", balance)
        
                resppppp.json({
                    message: "Gathered user successfully!",
                    availableBalance: balance
                })
            } catch (error) {
                console.error('Error fetching balance:', error);

                resppppp.status(500).json({
                    success: false,
                    message: 'Failed to fetch balance',
                    error: error.message,
                });
            }
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