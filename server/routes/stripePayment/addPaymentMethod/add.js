const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const { encryptString } = require("../../../crypto.js");
const _ = require("lodash");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.post("/", async (req, resppppp) => {

    const { 
        uniqueId,
        paymentMethodId
    } = req.body;

    console.log("req.body", req.body);

    const collection = Connection.db.db("test").collection("users");

    const resultMatch = await collection.findOne({ uniqueId });

    if (resultMatch !== null) {

        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
            customer: resultMatch.stripeAccountDetails.id,
        });

        console.log("paymentMethod", paymentMethod);

        // Update customer's default payment method
        await stripe.customers.update(
            resultMatch.stripeAccountDetails.id,
            {
                invoice_settings: {
                    default_payment_method: paymentMethod.id,
                },
            }
        ).then((res) => {
            console.log("res.data", res);

            resppppp.json({
                message: "Successfully saved card details!",
                data: res
            })
        }).catch((errrrrrr) => {
            console.log("errrrrrrerrrrrrr", errrrrrr);

            if (errrrrrr.raw.code === "instant_payouts_unsupported") {
                resppppp.json({
                    message: "This card is not eligible for Instant Payouts. Try a debit card from a supported bank."
                })
            } else if (errrrrrr.raw.code === "invalid_card_type") {
                resppppp.json({
                    message: "This does NOT appear to be a debit card - payouts can ONLY be used on debit cards..."
                })
            }
        });
    }
});

module.exports = router;