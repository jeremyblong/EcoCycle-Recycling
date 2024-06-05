
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const moment = require("moment");
const Client = require('authy-client').Client;
const authy = new Client({ key: config.get("twilioAuthyProductionKey") });
const NewUserRegistered = require("../../../schemas/auth/newUser.js");
const sendCodeAuthy = require("../twilio/sendCode.js");
const { encryptString } = require("../../../crypto.js");
const { Connection } = require("../../../mongoUtil.js");
const _ = require("lodash");
const fetch = require("node-fetch");
// const stripe = require('stripe')(config.get("stripeSecretKey"));


router.post("/", async (req, resppppp, next) => {
    
    const { firstName, lastName, email, username, password, file, phoneNumber, accountType, referralCode, deviceInfo } = req.body;

    const newDeviceInfoOBJ = {
        ...deviceInfo,
        dateOfOccurance: new Date(),
        dateOfOccuranceString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        idOfLog: uuidv4()
    }

    const collection = Connection.db.db("test").collection("invitedpoolingusers");
    const userCollection = Connection.db.db("test").collection("users");

    console.log("username.toLowerCase()", username.toLowerCase());
    console.log("password", password);

    if (typeof referralCode !== "undefined" && referralCode.length === 8) {

        const found = await collection.findOne({ codeChunk: referralCode });

        if (found === null) { 
            // no results found - return error to client
            resppppp.json({
                message: "Code did NOT match any records, process has been cancelled - please enter a valid 'referral' code to proceed & sign-up!"
            })
        } else {
            // FOUND RESULTS! Continue with remaining logic...

            const invitingUserAccount = await userCollection.findOne({ uniqueId: found.invitingUserID });

            console.log("invitingUserAccount", invitingUserAccount);

            if (invitingUserAccount !== null) {
                // remove referral code entry from database
                collection.deleteOne({ codeChunk: referralCode }).then(() => {
                    
                    const newData = {
                        id: uuidv4(),
                        percentageCut: found.percentage,
                        typeOfInvite: found.type,
                        invitationDateOriginal: found.date,
                        invitedName: found.name,
                        date: new Date()
                    };

                    const generatedID = uuidv4();

                    userCollection.update({ uniqueId: found.invitingUserID }, { $push: {
                        invitedUsers: newData
                    }}).then((obj) => {
                        // register user in DB
                        authy.registerUser({
                            countryCode: "US",
                            email: email.toLowerCase().trim(),
                            phone: phoneNumber.unmaskedPhoneNumber
                        }, (regErr, regRes) => {
                            if (regErr) {
                                console.log('regError Registering User with Authy', regErr);
                    
                                resppppp.json({
                                    message: "Error occurred while attempting to save the desired data to the DB...",
                                    err: regErr
                                })
                                return;
                            } else {

                                const additionalChatMetaData = {
                                    firstName: firstName.toLowerCase().trim(),
                                    lastName: lastName.toLowerCase().trim(),
                                    username: username.toLowerCase().trim(),
                                    email: email.toLowerCase().trim(),
                                    registrationDate: new Date(),
                                    registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                    accountType,
                                    phone: phoneNumber.unmaskedPhoneNumber,
                                }

                                const options = {
                                    method: 'POST',
                                    headers: {
                                        apiKey: config.get("commetRESTApiKey"),
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json'
                                    },
                                    body: JSON.stringify({
                                        metadata: {
                                            '@private': additionalChatMetaData
                                        },
                                        uid: generatedID,
                                        name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`,
                                        avatar: `${config.get("baseAssetURL")}/${file.link}`
                                    })
                                };
                            
                                const url = `https://${config.get("commetChatAppId")}.api-us.cometchat.io/v3/users`;
                                  
                                fetch(url, options).then((response) => response.json()).then((response) => {
                                    console.log("This is the response I'm looking for...:", response);

                                    NewUserRegistered.register(new NewUserRegistered({
                                        firstName: firstName.toLowerCase().trim(),
                                        lastName: lastName.toLowerCase().trim(),
                                        password: encryptString(password),
                                        username: username.toLowerCase().trim(),
                                        email: email.toLowerCase().trim(),
                                        profilePictures: [file],
                                        uniqueId: generatedID,
                                        verficationCompleted: false,
                                        registrationDate: new Date(),
                                        registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                        reviews: [],
                                        authStrategy: "local",
                                        refreshToken: [],
                                        paymentMethods: [],
                                        authyId: regRes.user.id,
                                        stripeAccountVerified: false,
                                        stripeAccountDetails: null,
                                        totalUniqueViews: 0,
                                        accountType,
                                        phone: phoneNumber.unmaskedPhoneNumber,
                                        currentEarnedPercentage: 100,
                                        securityAuthenticationLogs: [newDeviceInfoOBJ]
                                    }), password, async (err, user) => {
                                        if (err) {
                        
                                            console.log("error with passport : ", err);
                        
                                            resppppp.statusCode = 500;
                        
                                            resppppp.send(err);
                                        } else {
                                            console.log("else ran", user);
                        
                                            const runFinalChunk = () => {
                                                user.save((err, result) => {
                                                    if (err) {
                                                        console.log(err);
                        
                                                        resppppp.json({
                                                            message: "Error occurred while attempting to save the desired data to the DB...",
                                                            err
                                                        })
                                                    } else {
                                                        console.log("result", result);
    
                                                        // registerNewUserHLF(result.uniqueId);
                        
                                                        resppppp.json({
                                                            message: "Successfully registered!",
                                                            userData: result,
                                                            user: result
                                                        })
                                                    }
                                                })
                                            }
                        
                                            sendCodeAuthy(regRes.user.id, runFinalChunk)
                                        }
                                    });
                                }).catch(err => {
                                    console.log("This is the response but unfortunately encountered an ERROR...:", err);
                                });
                            }
                        });
                    }).catch((errorrrrrrr) => {
                        console.log("errorrrrrrr", errorrrrrrr);

                        resppppp.json({
                            message: "An unknown error has occurred while attempting to process your request...",
                            err: errorrrrrrr
                        })
                    });
                });
            } else {
                resppppp.json({
                    message: "Could NOT find relevant 'inviting user account' - cancelling process as this attempt has failed."
                })
            }
        };
    } else {
        if (accountType.value === "transport-account") {

                    authy.registerUser({
                        countryCode: "US",
                        email: email.toLowerCase().trim(),
                        phone: phoneNumber.unmaskedPhoneNumber
                    }, (regErr, regRes) => {
                        if (regErr) {
                            console.log('regError Registering User with Authy', regErr);
                
                            resppppp.json({
                                message: "Error occurred while attempting to save the desired data to the DB...",
                                err: regErr
                            })
            
                            return;

                        } else {

                            const generatedID = uuidv4();
            
                            const additionalChatMetaData = {
                                firstName: firstName.toLowerCase().trim(),
                                lastName: lastName.toLowerCase().trim(),
                                username: username.toLowerCase().trim(),
                                email: email.toLowerCase().trim(),
                                registrationDate: new Date(),
                                registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                accountType,
                                phone: phoneNumber.unmaskedPhoneNumber,
                            }
            
                            const options = {
                                method: 'POST',
                                headers: {
                                    apiKey: config.get("commetRESTApiKey"),
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json'
                                },
                                body: JSON.stringify({
                                    metadata: {
                                        '@private': additionalChatMetaData
                                    },
                                    uid: generatedID,
                                    name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`,
                                    avatar: `${config.get("baseAssetURL")}/${file.link}`
                                })
                            };
                        
                            const url = `https://${config.get("commetChatAppId")}.api-us.cometchat.io/v3/users`;
                              
                            fetch(url, options).then((response) => response.json()).then((response) => {
                                console.log("This is the response I'm looking for...:", response);
            
                                NewUserRegistered.register(new NewUserRegistered({
                                    firstName: firstName.toLowerCase().trim(),
                                    lastName: lastName.toLowerCase().trim(),
                                    password: encryptString(password),
                                    username: username.toLowerCase().trim(),
                                    email: email.toLowerCase().trim(),
                                    profilePictures: [file],
                                    uniqueId: generatedID,
                                    verficationCompleted: false,
                                    registrationDate: new Date(),
                                    registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                    reviews: [],
                                    authStrategy: "local",
                                    refreshToken: [],
                                    paymentMethods: [],
                                    authyId: regRes.user.id,
                                    stripeAccountVerified: false,
                                    stripeAccountDetails: null,
                                    totalUniqueViews: 0,
                                    accountType,
                                    phone: phoneNumber.unmaskedPhoneNumber,
                                    currentEarnedPercentage: 100,
                                    securityAuthenticationLogs: [newDeviceInfoOBJ],
                                    // stripeAccountData: accountData
                                }), password, async (err, user) => {
                                    if (err) {
                    
                                        console.log("error with passport : ", err);
                    
                                        resppppp.statusCode = 500;
                    
                                        resppppp.send(err);
                                    } else {
                                        console.log("else ran", user);
                    
                                        const runFinalChunk = () => {
                                            user.save((err, result) => {
                                                if (err) {
                                                    console.log(err);
                    
                                                    resppppp.json({
                                                        message: "Error occurred while attempting to save the desired data to the DB...",
                                                        err
                                                    })
                                                } else {
                                                    console.log("result", result);
                
                                                    // registerNewUserHLF(result.uniqueId);
                    
                                                    resppppp.json({
                                                        message: "Successfully registered!",
                                                        userData: result,
                                                        user: result
                                                    })
                                                }
                                            })
                                        }
                    
                                        sendCodeAuthy(regRes.user.id, runFinalChunk)
                                    }
                                });
                            }).catch(err => {
                                console.log("This is the response but unfortunately encountered an ERROR...:", err);
                            });
                        }
                    });
        
        } else if (accountType.value === "storage-dropoff-agent-account") {

            authy.registerUser({
                countryCode: "US",
                email: email.toLowerCase().trim(),
                phone: phoneNumber.unmaskedPhoneNumber
            }, (regErr, regRes) => {
                if (regErr) {
        
                    console.log('regError Registering User with Authy', regErr);
        
                    resppppp.json({
                        message: "Error occurred while attempting to save the desired data to the DB...",
                        err: regErr
                    })
    
                    return;

                } else {

                    const generatedID = uuidv4();
    
                    const additionalChatMetaData = {
                        firstName: firstName.toLowerCase().trim(),
                        lastName: lastName.toLowerCase().trim(),
                        username: username.toLowerCase().trim(),
                        email: email.toLowerCase().trim(),
                        registrationDate: new Date(),
                        registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                        accountType,
                        phone: phoneNumber.unmaskedPhoneNumber,
                    }
    
                    const options = {
                        method: 'POST',
                        headers: {
                            apiKey: config.get("commetRESTApiKey"),
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            metadata: {
                                '@private': additionalChatMetaData
                            },
                            uid: generatedID,
                            name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`,
                            avatar: `${config.get("baseAssetURL")}/${file.link}`
                        })
                    };
                
                    const url = `https://${config.get("commetChatAppId")}.api-us.cometchat.io/v3/users`;
                      
                    fetch(url, options).then((response) => response.json()).then((response) => {
                        console.log("This is the response I'm looking for...:", response);
    
                        NewUserRegistered.register(new NewUserRegistered({
                            firstName: firstName.toLowerCase().trim(),
                            lastName: lastName.toLowerCase().trim(),
                            password: encryptString(password),
                            username: username.toLowerCase().trim(),
                            email: email.toLowerCase().trim(),
                            profilePictures: [file],
                            uniqueId: generatedID,
                            verficationCompleted: false,
                            registrationDate: new Date(),
                            registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                            reviews: [],
                            authStrategy: "local",
                            refreshToken: [],
                            paymentMethods: [],
                            authyId: regRes.user.id,
                            stripeAccountVerified: false,
                            stripeAccountDetails: null,
                            totalUniqueViews: 0,
                            accountType,
                            phone: phoneNumber.unmaskedPhoneNumber,
                            currentEarnedPercentage: 100,
                            securityAuthenticationLogs: [newDeviceInfoOBJ],
                            // stripeAccountData: accountData
                        }), password, async (err, user) => {
                            if (err) {
            
                                console.log("error with passport : ", err);
            
                                resppppp.statusCode = 500;
            
                                resppppp.send(err);
                            } else {
                                console.log("else ran", user);
            
                                const runFinalChunk = () => {
                                    user.save((err, result) => {
                                        if (err) {
                                            console.log(err);
            
                                            resppppp.json({
                                                message: "Error occurred while attempting to save the desired data to the DB...",
                                                err
                                            })
                                        } else {
                                            console.log("result", result);
        
                                            // registerNewUserHLF(result.uniqueId);
            
                                            resppppp.json({
                                                message: "Successfully registered!",
                                                userData: result,
                                                user: result
                                            })
                                        }
                                    })
                                }
            
                                sendCodeAuthy(regRes.user.id, runFinalChunk)
                            }
                        });
                    }).catch(err => {
                        console.log("This is the response but unfortunately encountered an ERROR...:", err);
                    });
                }
            });
        } else {
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ accountType.value === "collection-agent-account" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

                    authy.registerUser({
                        countryCode: "US",
                        email: email.toLowerCase().trim(),
                        phone: phoneNumber.unmaskedPhoneNumber
                    }, (regErr, regRes) => {
                        if (regErr) {
                
                            console.log('regError Registering User with Authy', regErr);
                
                            resppppp.json({
                                message: "Error occurred while attempting to save the desired data to the DB...",
                                err: regErr
                            })
            
                            return;

                        } else {

                            const generatedID = uuidv4();
            
                            const additionalChatMetaData = {
                                firstName: firstName.toLowerCase().trim(),
                                lastName: lastName.toLowerCase().trim(),
                                username: username.toLowerCase().trim(),
                                email: email.toLowerCase().trim(),
                                registrationDate: new Date(),
                                registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                accountType,
                                phone: phoneNumber.unmaskedPhoneNumber,
                            }
            
                            const options = {
                                method: 'POST',
                                headers: {
                                    apiKey: config.get("commetRESTApiKey"),
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json'
                                },
                                body: JSON.stringify({
                                    metadata: {
                                        '@private': additionalChatMetaData
                                    },
                                    uid: generatedID,
                                    name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`,
                                    avatar: `${config.get("baseAssetURL")}/${file.link}`
                                })
                            };
                        
                            const url = `https://${config.get("commetChatAppId")}.api-us.cometchat.io/v3/users`;
                              
                            fetch(url, options).then((response) => response.json()).then((response) => {
                                console.log("This is the response I'm looking for...:", response);
            
                                NewUserRegistered.register(new NewUserRegistered({
                                    firstName: firstName.toLowerCase().trim(),
                                    lastName: lastName.toLowerCase().trim(),
                                    password: encryptString(password),
                                    username: username.toLowerCase().trim(),
                                    email: email.toLowerCase().trim(),
                                    profilePictures: [file],
                                    uniqueId: generatedID,
                                    verficationCompleted: false,
                                    registrationDate: new Date(),
                                    registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                    reviews: [],
                                    authStrategy: "local",
                                    refreshToken: [],
                                    paymentMethods: [],
                                    authyId: regRes.user.id,
                                    stripeAccountVerified: false,
                                    stripeAccountDetails: null,
                                    totalUniqueViews: 0,
                                    accountType,
                                    phone: phoneNumber.unmaskedPhoneNumber,
                                    currentEarnedPercentage: 100,
                                    securityAuthenticationLogs: [newDeviceInfoOBJ],
                                    // stripeAccountData: accountData
                                }), password, async (err, user) => {
                                    if (err) {
                    
                                        console.log("error with passport : ", err);
                    
                                        resppppp.statusCode = 500;
                    
                                        resppppp.send(err);
                                    } else {
                                        console.log("else ran", user);
                    
                                        const runFinalChunk = () => {
                                            user.save((err, result) => {
                                                if (err) {
                                                    console.log(err);
                    
                                                    resppppp.json({
                                                        message: "Error occurred while attempting to save the desired data to the DB...",
                                                        err
                                                    })
                                                } else {
                                                    console.log("result", result);
                
                                                    // registerNewUserHLF(result.uniqueId);
                    
                                                    resppppp.json({
                                                        message: "Successfully registered!",
                                                        userData: result,
                                                        user: result
                                                    })
                                                }
                                            })
                                        }
                    
                                        sendCodeAuthy(regRes.user.id, runFinalChunk)
                                    }
                                });
                            }).catch(err => {
                                console.log("This is the response but unfortunately encountered an ERROR...:", err);
                            });
                        }
                    });
        }
    }
});

module.exports = router;