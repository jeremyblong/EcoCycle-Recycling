const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {

    const { postedByID } = req.query;

    console.log("/gather/only/profile/picture/with/id api-request...:", postedByID);

    const collection = Connection.db.db("test").collection("users");

    const filteredQueryFields = { projection: { firstName: 1, lastName: 1, username: 1, email: 1, profilePictures: 1, uniqueId: 1, verificationCompleted: 1, registrationDate: 1, registrationDateString: 1, reviews: 1, totalUniqueViews: 1, stripeAccountVerified: 1, currentApproxLocation: 1 }};

    collection.findOne({ uniqueId: postedByID }, filteredQueryFields).then((user) => {
        if (!user) {

            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            });
        } else {
            console.log("user user user user user user", user);

            resppppp.json({
                message: "Submitted gathered user's picture/file!",
                user
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;