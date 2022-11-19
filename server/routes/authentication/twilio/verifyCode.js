const express = require("express");
const router = express.Router();
const config = require("config");
const Client = require('authy-client').Client;
const authy = new Client({ key: config.get("twilioAuthyProductionKey") });

router.post("/", (req, res) => {

    const { code, authyId } = req.body;

    authy.verifyToken({ authyId, token: code.toString() }, (err, tokenRes) => {
        if (err) {

            console.log("Verify Token Error: ", err);

            res.status(500).json({
                message: "Unable to verify account with the provided code.",
                successful: false,
                err
            })

            return;
        }
        console.log("Verify Token Response: ", tokenRes);

        if (tokenRes.success) {

            req.session.authy = true;
        }
        res.status(200).json({
            message: "Submitted successfully!",
            successful: true
        })
    });
});

module.exports = router;