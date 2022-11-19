const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DropOffListingSchema = new Schema({
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
    alreadyCompletedDeliveries: {
        type: Number
    },
    comments: {
        type: Array
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    postedByID: {
        type: String
    },
    postedByName: {
        type: String
    },
    postedByUsername:  {
        type: String
    },
    newlyConstructedCoordsRandomizedNearby: {
        type: Object,
        properties: {
            type: {
                type: String,
                enum: 'Point',
                default: 'Point'
            },
            coordinates: {
                type: [ Number ],
                default: [ 0, 0 ]
            }
        }
    }
});


module.exports = DropOff = mongoose.model("dropoff", DropOffListingSchema);