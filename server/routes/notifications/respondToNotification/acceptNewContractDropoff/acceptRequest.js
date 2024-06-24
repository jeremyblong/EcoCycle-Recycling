const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", async (req, resppppp) => {
    // deconstruct data...
    const { selected, authenticatedUserData, notification } = req.body;
    const { uniqueId } = authenticatedUserData;

    console.log("notification req.boddy : ", notification);
    
    const collection = Connection.db.db("test").collection("users");
    const collectionDropoffs = Connection.db.db("test").collection("dropoffs");

    // const dropoffDetailsDB = await collectionDropoffs.findOne({ postedByID: notification.metadata.from });

    // if (dropoffDetailsDB !== null) {      
    console.log("this one ran....");  
    
    const newAdditionObj = {
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        completed: false,
        notificationData: selected.notification,
        requestee: selected.notification.metadata.from,
        submittedData: selected.notification.metadata.other,
        dropoffCartItems: selected.notification.metadata.cartData,
        commentUpdates: [],
        timelineOfEventsProcessed: []
        // expires: null 
    };

    const from = selected.notification.metadata.from;
    const newDelivery = {
        cartData: selected.notification.metadata.cartData,
        receivingUserID: uniqueId,
        // dropoffDataMain: dropoffDetailsDB.mainData,
        code: uuidv4().split("-")[0],
        date: new Date(),
        id: uuidv4(),
        dateTimeDelivery: selected.notification.metadata.other.dateTime,
        noteText: selected.notification.metadata.other.noteText,
        contactNumDetails: selected.notification.metadata.other.phoneNumberData,
        intervalOfDeliveryFromDate: selected.notification.metadata.other.interval,
        intervalTimeMeasurement: "minutes"
    };
    const updateQuery = { $push: {
        unresolvedDropoffs: newAdditionObj
    }};

    const targetedUser = { uniqueId };
    
    collection.findOneAndUpdate(targetedUser, updateQuery, { returnDocument: 'after' }, async (err, doc) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Request could NOT be completed or 'accepted' properly... NO action taken.",
                err
            });
        } else {
            console.log("doccccc", doc);

            const removeOldNotificationQuery = {
                $pull: {
                    notifications: { id: selected.notification.id }
                }
            };

            const deliveryUpdate = await collection.findOneAndUpdate({ uniqueId: from }, { $push: { activePendingDeliveries: newDelivery }}, { returnDocument: 'after' },)

            if (deliveryUpdate) {
                collection.findOneAndUpdate(targetedUser, removeOldNotificationQuery, { returnDocument: 'after' }, (errorrrr, document) => {
                    if (errorrrr) {
    
                        console.log("errorrrr", errorrrr);
    
                        const notificationID = (typeof doc.value.unresolvedDropoffs !== "undefined" && doc.value.unresolvedDropoffs.length > 0) ? doc.value.unresolvedDropoffs[doc.value.unresolvedDropoffs.length - 1].id : "undetermined-no-action-match";
    
                        const removePreviouslyAddedDataDueFailure = {
                            $pull: {
                                "unresolvedDropoffs.$.id": notificationID
                            }
                        };
    
                        collection.findOneAndUpdate(targetedUser, removePreviouslyAddedDataDueFailure, { returnDocument: 'after' }, (reversalErr, reversalDoc) => {
                            if (reversalErr) {
            
                                console.log("reversalErr", reversalErr);
    
                                resppppp.json({
                                    message: "Error occurred while attempting to remove data...",
                                    err: reversalErr
                                });
        
                            } else {
                                console.log("reversalDoc", reversalDoc);
    
                                resppppp.json({
                                    message: "Request could NOT be completed or 'accepted' properly... NO action taken.",
                                    err
                                });
                            }
                        })
    
                    } else {
                        console.log("document", document);
    
                        resppppp.json({
                            message: "Successfully accepted the new proposal/request & it is now active in your 'pending queue'!",
                            result: null
                        });
                    }
                })
            }
        }
    });
    // } else {
    //     resppppp.json({
    //         message: "Request could NOT be completed or 'accepted' properly... NO action taken.",
    //         err: null
    //     });
    // }
});

module.exports = router;