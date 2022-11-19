const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterLogNewIncidentReportSchema = new Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    occuranceDateAndTime: {
        type: Date
    },
    address: {
        type: Object
    },
    description: {
        type: String
    },
    hashtags: {
        type: Array
    },
    typeOfIncident: {
        type: String
    },
    date: {
        type: Date
    },
    legibleDate: {
        type: String
    },
    identifier: {
        type: String
    },
    comments: {
        type: Array
    },
    reactions: {
        type: Object
    },
    postedBy: {
        type: String
    }
});


module.exports = NewIncident = mongoose.model("incident", RegisterLogNewIncidentReportSchema);