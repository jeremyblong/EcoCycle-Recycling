const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { Connection } = require("../../mongoUtil.js");
const { 
    decryptString
} = require("../../crypto.js");


// Called during login/sign up.
passport.use("users", new LocalStrategy({
    usernameField: 'phoneNumber',
    passwordField: 'password',
    passReqToCallback: true 
}, (req, phoneNumber, password, done) => {

    const collection = Connection.db.db("test").collection("users");
    
    console.log("ran ------------- :", phoneNumber);

    collection.findOne({ phone: phoneNumber }).then((user) => {
        if (!user) {
            return done(null, false, { message: 'Error - a problem occurred...' });
        } else {

            console.log("user", user);

            if ((phoneNumber === user.phone) && (password === decryptString(user.password))) {
                return done(null, user, req);
            } else {
                return done(null, false, { message: "User could NOT be authenticated - make sure you're using a valid phone number & password combination." })
            }
        }
    }).catch((err) => {
        console.log(err);

        return done(err);
    })
}));
// called while after logging in / signing up to set user details in req.user
passport.serializeUser((user, done) => {
    done(null, user._id);
});