const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: ""
    }
})

const NewUserRegistered = new Schema({
    firstName: {
        type: String
    },
    accountType: {
        type: Object
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
    stripeAccountData: {
        type: Object
    },
    email: {
        type: String
    },
    profilePictures: {
        type: Array
    },
    uniqueId: {
        type: String
    },
    verficationCompleted: {
        type: Boolean
    },
    registrationDate: {
        type: Date
    },
    securityAuthenticationLogs: {
        type: Array
    },
    registrationDateString: {
        type: String
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    },
    reviews: {
        type: Array
    },
    authStrategy: {
        type: String
    },
    refreshToken: {
        type: Array
    },
    paymentMethods: {
        type: Array
    },
    authyId: {
        type: Number
    },
    stripeAccountVerified: {
        type: Boolean
    },
    stripeAccountDetails: {
        type: Object
    },
    totalUniqueViews: {
        type: Number
    },
    phone: {
        type: String
    }
});

NewUserRegistered.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.refreshToken
        return ret
    }
});

NewUserRegistered.plugin(passportLocalMongoose)


module.exports = NewBetaUser = mongoose.model("user", NewUserRegistered);