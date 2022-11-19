const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const { ObjectId } = require('mongodb'); 

router.get("/", async (req, resppppp) => {

    const { item, category } = req.query;

    const collectionName = JSON.parse(JSON.parse(JSON.stringify(category))).value;
    
    const collection = Connection.db.db("test").collection(collectionName);

    const _id = JSON.parse(JSON.parse(JSON.stringify(item)))._id;

    const result = await collection.findOne({ _id: ObjectId(_id) });

    if (result !== null) {
        resppppp.json({
            message: "Successfully fetched individual product!",
            result,
            type: collectionName
        })
    } else {
        resppppp.json({
            message: "Could NOT find your desired/selected product..."
        })
    }
});

module.exports = router;