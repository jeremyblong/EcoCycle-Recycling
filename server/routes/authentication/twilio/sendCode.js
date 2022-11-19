const express = require("express");
const router = express.Router();
const config = require("config");
const Client = require('authy-client').Client;
const authy = new Client({ key: config.get("twilioAuthyProductionKey") });


const sendCodeAuthy = (authyId, callback) => {
    // send code to sms
    authy.requestSms({ authyId }, { force: true }, (err, smsRes) => {
        if (err) {
            console.log('ERROR requestSms', err);
            return false;
        }
        console.log("requestSMS response: ", smsRes);

        callback();
    });
} 

module.exports = sendCodeAuthy;