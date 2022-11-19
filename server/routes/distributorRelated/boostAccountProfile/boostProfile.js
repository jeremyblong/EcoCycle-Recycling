const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
// const NewPromotedAccountDropoffSave = require("../../../schemas/distributorAccountRelated/promotedAccountSchema.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


router.post("/", (req, resppppp) => {

    const { uniqueId, selected, user } = req.body;

    const { firstName, accountType, username, lastName, email, verficationCompleted, registrationDateString, registrationDate, reviews, totalUniqueViews, phone } = user;

    const {
       hours, 
       cost
    } = selected;

    const newData = {
        firstName, 
        accountType, 
        username, 
        lastName, 
        email, 
        uniqueId,
        verficationCompleted, 
        registrationDateString, 
        registrationDate, 
        reviews, 
        totalUniqueViews, 
        phone,
        id: uuidv4(),
        postedDate: new Date(),
        postedDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        selected,
        expiresRaw: new Date(moment(new Date()).add(hours, "hours")),
        expiresMoment: moment(new Date()).add(hours, "hours")
    };

    const RegisterNewDropoffRelatedDataProfile = new Schema({
        firstName: {
            type: String
        },
        accountType: {
            type: Object
        },
        lastName: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        selected: {
            type: Object
        },
        id: {
            type: String
        },
        postedDate: {
            type: Date
        },
        postedDateString: {
            type: String
        },
        uniqueId: {
            type: String
        },
        verficationCompleted: {
            type: Boolean
        },
        registrationDate: {
            type: Date
        },
        registrationDateString: {
            type: String
        },
        reviews: {
            type: Array
        },
        totalUniqueViews: {
            type: Number
        },
        phone: {
            type: String
        },
        expiresMoment: {
            type: String
        }, 
        expiresRaw: {
            type: Date
        },
        expireAt: { 
            type: Date, 
            default: (Number(hours) * 60 * 60)
        }
    });

    const NewPromotedSchema = mongoose.model("boosteddropoff", RegisterNewDropoffRelatedDataProfile);

    const newRegistration = new NewPromotedSchema(newData);

    newRegistration.save((err, result) => {
        if (err) {
            console.log("errrrrrrrrr", err);
        } else {

            console.log("result", result);

            resppppp.json({
                message: "Successfully boosted account!",
                result
            })      
        }
    })
});

module.exports = router;