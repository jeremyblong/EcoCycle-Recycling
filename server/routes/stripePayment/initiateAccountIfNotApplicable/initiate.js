const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.get("/", async (req, resppppp) => {
    const { 
        uniqueId
    } = req.query;

    console.log("Initiate stripe payment info if applicable: ", req.query);

    const collection = Connection.db.db("test").collection("users");
    // find logged in user data...
    const foundMatch = await collection.findOne({ uniqueId });
    // check if match and no details existent...
    if (foundMatch !== null && foundMatch.stripeAccountDetails === null) {
        if (foundMatch.accountType !== "ewaste-donor-account") {
            await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                email: foundMatch.email.toLowerCase().trim(),
                business_type: "individual",
                individual: {
                    email: foundMatch.email.toLowerCase().trim(),
                    first_name: foundMatch.firstName.toLowerCase().trim(),
                    last_name: foundMatch.lastName.toLowerCase().trim()
                },
                capabilities: {
                    card_payments: {
                        requested: true
                    },
                    transfers: {
                        requested: true
                    }
                },
            }, (errrrrrror, accountData) => {
                if (errrrrrror) {
                    console.log(errrrrrror);
            
                    resppppp.send({
                        message: "An error occurred while attempting to register this new account...",
                        err: errrrrrror
                    })
                } else {
                      console.log("accountData", accountData);

                      collection.findOneAndUpdate({ uniqueId }, { $set: { stripeAccountDetails: accountData }}, { returnDocument: 'after' }, (err, doc) => {
                        if (err) {
                            console.log("err with updating FCM token data....", err);
                
                            resppppp.json({
                                message: "User could NOT be found.",
                                err
                            })
                        } else {
                            console.log("Updated the value (as applicable)...:", doc);
                            
                            resppppp.json({
                                message: "Gathered and processed if applicable!",
                                success: true
                            });
                        }
                    });
                }
            });
        } else {

            await stripe.customers.create({
                description: 'Customer Account Type',
                email: foundMatch.email.toLowerCase().trim(),
                name: `${foundMatch.firstName.toLowerCase().trim()} ${foundMatch.lastName.toLowerCase().trim()}`
            }, async (errrrrrror, accountData) => {
                if (errrrrrror) {
                    console.log("errrrrrror", errrrrrror);
            
                    // res.send({
                    //     message: "An error occurred while attempting to register this new account...",
                    //     err: errrrrrror
                    // })
                } else {
                    console.log("accountData", accountData);

                    collection.findOneAndUpdate({ uniqueId }, { $set: { stripeAccountDetails: accountData }}, { returnDocument: 'after' }, (err, doc) => {
                        if (err) {
                            console.log("err with updating FCM token data....", err);
                
                            resppppp.json({
                                message: "User could NOT be found.",
                                err
                            })
                        } else {
                            console.log("Updated the value (as applicable)...:", doc);
                            
                            resppppp.json({
                                message: "Gathered and processed if applicable!",
                                success: true
                            });
                        }
                    });
                }
            })
        }
    } else {
        resppppp.json({
            message: "Gathered and processed if applicable!",
            success: true
        });
    }
});

module.exports = router;