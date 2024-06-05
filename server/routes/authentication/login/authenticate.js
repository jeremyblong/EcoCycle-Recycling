const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Connection } = require("../../../mongoUtil.js");
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');

router.post("/", (req, resppppp, next) => {
    // authenticate via passport auth flow/logic...
    passport.authenticate('users', (err, user, passedReq) => {
        if (err) {
            resppppp.json({
                message: "User could NOT be authenticated - make sure you're using a valid 'phone number' and 'password' combination."
            })
        } else {
            if (!user) {
                resppppp.json({
                    message: "User could NOT be authenticated - make sure you're using a valid 'phone number' and 'password' combination."
                })
            } else {
                const { deviceInfo } = passedReq.body;

                    const newDeviceInfoOBJ = {
                        ...deviceInfo,
                        dateOfOccurance: new Date(),
                        dateOfOccuranceString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                        idOfLog: uuidv4()
                    };
                    const collection = Connection.db.db("test").collection("users");

                    const { uniqueId, firstName, lastName } = user;

                    collection.findOneAndUpdate({ uniqueId }, { $push: {
                        securityAuthenticationLogs: newDeviceInfoOBJ
                    }}, { returnDocument: 'after' },  (err, data) => {
                        if (err) {
                            console.log(err);

                            resppppp.json({
                                message: "Successfully authenticated w/o logging related security details...",
                                err
                            })
                        } else {
                            resppppp.json({
                                message: "Successfully authenticated!",
                                user
                            })
                        }
                    });

                // const bodyMain = {
                //     "grant_type": "client_credentials",
                //     "client_id": config.get("fedexApiKey"),
                //     "client_secret": config.get("fedexSecretKey")
                // };

                // fetch("https://apis-sandbox.fedex.com/oauth/token", {
                //     headers: {
                //         // "Authorization": `Basic ${base64data}`,
                //         "Content-Type": "application/x-www-form-urlencoded",
                //     },
                //     method: "POST",
                //     body: qs.stringify(bodyMain)
                // }).then(async (ressssssss) => {
                //     const data = await ressssssss.json();

                //     console.log("dataaaaaaaaaaaaa", data);

                //     const { access_token } = data;

                //     const { deviceInfo } = passedReq.body;

                //     const newDeviceInfoOBJ = {
                //         ...deviceInfo,
                //         dateOfOccurance: new Date(),
                //         dateOfOccuranceString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                //         idOfLog: uuidv4()
                //     };
                //     const collection = Connection.db.db("test").collection("users");

                //     const { uniqueId, firstName, lastName } = user;

                //     collection.findOneAndUpdate({ uniqueId }, { $push: {
                //         securityAuthenticationLogs: newDeviceInfoOBJ
                //     }}, { returnDocument: 'after' },  (err, data) => {
                //         if (err) {
                //             console.log(err);

                //             resppppp.json({
                //                 message: "Successfully authenticated w/o logging related security details...",
                //                 err
                //             })
                //         } else {
                //             resppppp.json({
                //                 message: "Successfully authenticated!",
                //                 user: {
                //                     ...user,
                //                     latestFedexAccessToken: access_token
                //                 }
                //             })
                //         }
                //     });
                // }).catch((errrrrror) => {
                //     console.log("critical errorerrrrrror", errrrrror);
                // })
            }
        }
    })(req, resppppp, next);
});

module.exports = router;