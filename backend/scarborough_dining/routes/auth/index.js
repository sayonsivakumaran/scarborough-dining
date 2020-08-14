const express = require('express');
const router = express.Router();
require('dotenv').config();

/* CITATION: Resources used for code in this section:
 * (1) https://www.youtube.com/watch?v=o9e3ex-axzA
 * (2) https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0
 * (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
 * (4) http://www.passportjs.org/ documentation
 */

let FRONT_END_URL = "";
if (process.env.NODE_ENV === "production") {
  FRONT_END_URL = "/"
} else {
  FRONT_END_URL = "http://localhost:3000"
}

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

/* TODO: The redirect urls are set to localhost domain, 
 * but in production will be set to the url of web app.
 */

//Import passport for access to authentication strategies
const passport = require('passport');

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
/**
 * @route           /auth/login/google
 * @description     Make a GET request to the google for authenticating google credentials
 */
router.get('/login/google', passport.authenticate('google-login', {scope: ['profile', 'email']}));

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
/**
 * @route           /auth/login/google/callback
 * @description     The route the google calls after authenticating google credentials.
 *                  This will be called by google regardless of the validaty of credentials.
 */
router.get('/login/google/callback', passport.authenticate('google-login', {failureRedirect: `${FRONT_END_URL}#/login/fail`}), (req,res) => {
    res.redirect(`${FRONT_END_URL}`);

})

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
/**
 * @route           /auth/register/google
 * @description     Make a GET request to the google for authenticating google credentials
 */
router.get('/register/google', passport.authenticate('google-register', {scope: ['profile', 'email']}));

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
/**
 * @route           /auth/login/google/callback
 * @description     The route the google calls after authenticating google credentials.
 *                  This will be called by google regardless of the validaty of credentials.
 */
router.get('/register/google/callback', passport.authenticate('google-register', {failureRedirect: `${FRONT_END_URL}/#/register/fail`}), (req,res) => {
    res.redirect(`${FRONT_END_URL}/#/account-information`);
})

// CITATION: (3) https://www.youtube.com/watch?v=SBvmnHTQIPY&t=4129s
/**
 * @route           /auth/logout
 * @description     Perform a GET request to log user out of session. 
 *                  Then deletes the session's cookie and redirect back to home page
 */
router.get("/logout", (req, res) => {
  req.session.destroy()
  req.logout();
  res.clearCookie('connect.sid');
  res.redirect(`${FRONT_END_URL}`);
})

// CITATION: (2) https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0
/**
 * @route           /auth/login/success
 * @description     When user is logged in this route will be used to access user data
 */
router.get("/login/success", isLoggedIn, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

module.exports = router;