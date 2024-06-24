const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
    facilityName: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },
    contactEmail: { type: String, required: true }, // Added email field
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        fullAddress: { type: String, required: true },
        position: { type: Object, default: false }
    }, // Added address field
    uploaded: { type: Array, default: false },
    fullAddressDetails: { type: Object, default: false },
    facilityType: { type: String, required: true },
    dropOffInstructions: { type: String, required: true },
    hoursOfOperation: { type: Object, required: true },
    website: { type: String }, // Added website field
    uniqueId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdAtString: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    creator: { type: String, required: true },
    creatorName: { type: String, required: true },
    locationOrganized: {
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

module.exports = Facility = mongoose.model("partnerfacility", facilitySchema);