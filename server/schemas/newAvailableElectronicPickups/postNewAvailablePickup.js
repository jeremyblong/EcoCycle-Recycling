const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterNewAvailablePickupDeliverySchema = new Schema({
    mainData: {
        type: Object
    },
    date: {
        type: Date
    },
    dateString: {
        type: String
    },
    id: {
        type: String
    },
    newPostPostedByID: {
        type: String
    },
    newPostPostedByName: {
        type: String
    },
    newPostPostedByUsername:  {
        type: String
    }
});


module.exports = NewAvailablePickupDelivery = mongoose.model("availableelectronicsdropoff", RegisterNewAvailablePickupDeliverySchema);