const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterNewPooledUserResourcesSplitSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Object
    },
    percentage: {
        type: Number
    },
    invitingUserID: {
        type: String
    },
    codeChunk: {
        type: String
    },
    date: {
        type: Date
    },
    type: {
        type: String
    }
});

module.exports = NewPooledUser = mongoose.model("invitedpoolinguser", RegisterNewPooledUserResourcesSplitSchema);