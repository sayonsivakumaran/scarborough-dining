const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// Import User model
const User = require('../../models/user');

module.exports = function(passport) {

        // Login passport
        passport.use("google-login", new GoogleStrategy({
            clientID: "656946100283-jg3i887mogbi1976j62oesvqoi06550g.apps.googleusercontent.com",
            clientSecret: "1S7LKMMVHaOUtRegT7niKzhS",
            callbackURL: "http://localhost:5000/auth/login/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = {
                googleId: profile.id,
            }

            try {
                let user = await User.findOne({googleId: profile.id})
                console.log(user);
                if (user) {
                    // Valid user
                    console.log(profile);
                    done(null, user);
                } else {
                    //Invalid user
                    done(null, false, { message: "This user does not exist in database"});
                }
            } catch (err) {
                console.error(err);
            }
        }));

        passport.use("google-register", new GoogleStrategy({
            clientID: "656946100283-jg3i887mogbi1976j62oesvqoi06550g.apps.googleusercontent.com",
            clientSecret: "1S7LKMMVHaOUtRegT7niKzhS",
            callbackURL: "http://localhost:5000/auth/register/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
                admin: false
            }
            
            try {
                let user = await User.findOne({googleId: profile.id})
                if (user) {
                    // Valid user
                    console.log("Hello")
                    done(null, false, { message: "This user already exists in the database"});
                } else {
                    //Invalid user
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
            }
        }));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        
        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    
}