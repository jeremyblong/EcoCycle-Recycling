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
            notifications.map((item) => {
                console.log("iteeeeeeeeeeeeeeeeeem", item);
                // deconstruct uniqueId from notification from client
                const { from } = item.metadata;
                // API-request configuration data
                const configuration = {
                    params: {
                        uniqueId: from
                    }
                }
                // create promise to be pushed later
                const newPromise = new Promise((resolve, reject) => {
                    // fetch user information (ONLY core information - nothing private.)...
                    axios.get(`${config.get("baseURL")}/gather/general/information/user`, configuration).then((res) => {
                        // deconstruct variables returned from response (user could potentially be null/empty/undefined)...
                        const { user, message } = res.data;
                        // combined old/new data from notification data and user-data...

                        const sensitiveFields = [
                            '__v', '_id', 'authyId', 'email', 'firebasePushNotificationToken', 'hash', 
                            'password', 'phone', 'pin', 'salt', 'invitedUsers', 'securityAuthenticationLogs', 
                            'currentApproxLocation.geo.coordinates', 'paymentMethods', 'stripeAccountDetails', 'stripeAccountVerified', 'verficationCompleted'
                        ];
                        
                        const sanitizedUser = _.omit(user, sensitiveFields);

                        const combinedNotificationUserData = {
                            notification: item,
                            user: sanitizedUser
                        }
                        // check for proper/expected response from API request
                        if (message === "Gathered user successfully!") {
    
                            resolve(combinedNotificationUserData);
                        } else {
                            
                            resolve(null);
                        }
                    }).catch((err) => {
    
                        console.log("Errorred to receive user data per request...", err);
    
                        resolve(null);
                    })
                });
                // push promise into queue
                promises.push(newPromise);
                // resolve promises upon completion of all requests...
            })

            Promise.all(promises).then((results) => {
                console.log("results", results);
                // return response
                resppppp.json({
                    message: "Gathered notifications!",
                    notifications: results
                });
            })
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