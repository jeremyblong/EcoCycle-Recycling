const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Connection } = require("../../../mongoUtil.js");
const transporter = require("../../../controllers/nodemailer/transportConfig.js");
const { sendEmailViaTemplate } = require("./helpers/sendLabelShippingEmailTemplate.js");

router.post("/", async (req, resppppp) => {
    // deconstruct data...
    const { link, uniqueId, freightData } = req.body;

    const collection = Connection.db.db("test").collection("users");

    const matching = await collection.findOne({ uniqueId });

    if (matching !== null) {
        const mailOptions = sendEmailViaTemplate(link, "blongjeremy@gmail.com"); // matching.email

        collection.findOneAndUpdate({ uniqueId }, { $push: {
            activeRequestedShippingData: freightData
        }}, async (err, data) => {
            if (err) {
                console.log(err);
    
                resppppp.json({
                    message: "An error occurred while attempting to update DB information...",
                    err
                })
            } else {
                console.log("result", data);
    
                await transporter.sendMail(mailOptions, (errrrrrrrror, info) => {
                    if (errrrrrrrror) {
                        // errrrrrrrror
                        console.log("errrrrrrrror!", errrrrrrrror);
            
                        resppppp.json({
                            message: "An error occurred while attempting to send email..",
                            success: false,
                            code: null
                        })
                    } else {
                        // success
                        console.log("successfully sent email ! : ", info);
            
                        resppppp.json({
                            message: "Sent successfully!",
                            success: true
                        });
                    }
                });
            }
        })
    } else {
        resppppp.json({
            message: "An error occurred while attempting to update DB information...",
            err: null
        })
    }
});

module.exports = router;