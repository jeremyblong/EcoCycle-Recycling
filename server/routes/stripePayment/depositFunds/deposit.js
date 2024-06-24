const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.post("/", (req, resppppp, next) => {
    
    const { amount, currency, uniqueId } = req.body;

    const collection = Connection.db.db("test").collection("users");

    collection.findOne({ uniqueId }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            const { id } = user.stripeAccountDetails;

            const paymentMethods = await stripe.paymentMethods.list({
                customer: id,
                type: 'card',
            })
            
            console.log("paymentMethods", paymentMethods.data);

            paymentMethods.data.map((payment) => console.log("payment.card", payment));

            const amountCalculated = Number(amount * 100);
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amountCalculated,
                    currency: currency,
                    customer: id,
                    payment_method: paymentMethods.data[0].id,
                    destination: connectedAccountId,
                    confirm: true
                });

                console.log("paymentIntent", paymentIntent);

                if (paymentIntent) {
                    collection.findOneAndUpdate({ uniqueId }, { $inc: { accountBalance: Number(amount) }}, { returnDocument: 'after' }, (err, doc) => {
                        if (err) {
                            
                            resppppp.json({
                                message: "Could not find the appropriate results...",
                                err
                            });
                        } else {
                            const { value } = doc;
                            
                            resppppp.json({ 
                                message: "Successfully processed request!",
                                success: true
                            })
                        }
                    })
                }
            } catch (error) {
                console.log("err", error);
                
                resppppp.status(400).json({ error: error.message, success: false });
            }
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err,
            success: false
        })
    })
});

module.exports = router;