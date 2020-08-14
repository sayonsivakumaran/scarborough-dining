const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../../models/user');
require('dotenv').config()

/* CITATION: Resources used for code in this section:
 * (1) https://www.youtube.com/watch?v=o9e3ex-axzA
 * (2) https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0
 * (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
 * (4) http://www.passportjs.org/ documentation
 */

/**
 * @param           passport - import from passport.js
 * @description     Function for using defined strategies to authenticate user information
 */
module.exports = function(passport) {

        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

        if (process.env.NODE_ENV === "production") {
            BACK_END_URL = "/" 
        } else { 
            BACK_END_URL = "http://localhost:5000" 
        }

        // LogIn Passport - Retrieves user information and attemps to find in user database
        passport.use("google-login", new GoogleStrategy({
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: `${BACK_END_URL}/auth/login/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = {
                googleId: profile.id,
            }

            try {
                let user = await User.findOne({googleId: profile.id})
                if (user) {
                    done(null, user);
                } else {
                    // TODO: Create an error message displayed on front-end
                    done(null, false, { message: "This user does not exist in database"});
                }
            } catch (err) {
                console.error(err);
            }
        }));

        // Register Passport - Retrieves Google Account Information and attempts to create new user
        passport.use("google-register", new GoogleStrategy({
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: `${BACK_END_URL}/auth/register/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
                email: profile.emails[0].value
            }
            
            try {
                let user = await User.findOne({googleId: profile.id})
                if (user) {
                    // TODO: Create an error message displayed on front-end
                    done(null, false, { message: "This user already exists in the database"});
                } else {
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
            }
        }));

        // Middleware function defined in passport.js to serialize user information
        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        
        // Middleware function defined in passport.js to deserialize user information
        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    
}