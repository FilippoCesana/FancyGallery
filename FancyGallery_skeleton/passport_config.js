const LocalStrategy = require('passport-local').Strategy
//const bcrypt = require('bcrypt');
const User = require('./dataModels/User');
const log = require("debug")(":->passportConfig:");


function initialize(passport) {
    log("Configuring passport")
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({email: email}).lean();
           // console.log(user);
            if (!user) {
                return done(null, false, {error: 'no user found'})
            }
            //await bcrypt.compare(password, user.password)TODO
            if (password === user.password) {
                log(user.email + "   logged");
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password is incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    };

    passport.use(new LocalStrategy({usernameField: 'email', password: 'password'}, authenticateUser));

    passport.serializeUser(function (user, done) {
        done(null, user.email)
    });

    passport.deserializeUser(async function (email, done) {
            const user = await User.findOne({email: email}).lean();
            return done(null, user);
        }
    )
}

module.exports = initialize;