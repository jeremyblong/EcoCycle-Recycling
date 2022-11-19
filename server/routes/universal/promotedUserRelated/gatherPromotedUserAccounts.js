const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp) => {

    const collection = Connection.db.db("test").collection("boosteddropoffs");
    // find related matches...
    collection.find({}).limit(50).toArray().then((users) => {    

        console.log("users", users);

        resppppp.json({
            message: "Gathered list of users!",
            users
        })
    });
});

module.exports = router;