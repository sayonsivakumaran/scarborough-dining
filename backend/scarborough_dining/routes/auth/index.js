const express = require('express');
const router = express.Router();

/* TODO: The redirect urls are set to localhost domain, 
 * but in production will be set to the url of web app.
 */

//Import passport for access to authentication strategies
const passport = require('passport');

/**
 * @route           /auth/login/google
 * @description     Make a GET request to the google for authenticating google credentials
 */
router.get('/login/google', passport.authenticate('google-login', {scope: ['profile']}));

/**
 * @route           /auth/login/google/callback
 * @description     The route the google calls after authenticating google credentials.
 *                  This will be called by google regardless of the validaty of credentials.
 */
router.get('/login/google/callback', passport.authenticate('google-login', {failureRedirect: 'http://localhost:3000/#/login/fail'}), (req,res) => {
    res.redirect('http://localhost:3000');

})

/**
 * @route           /auth/register/google
 * @description     Make a GET request to the google for authenticating google credentials
 */
router.get('/register/google', passport.authenticate('google-register', {scope: ['profile']}));

/**
 * @route           /auth/login/google/callback
 * @description     The route the google calls after authenticating google credentials.
 *                  This will be called by google regardless of the validaty of credentials.
 */
router.get('/register/google/callback', passport.authenticate('google-register', {failureRedirect: 'http://localhost:3000/#/register/fail'}), (req,res) => {
    res.redirect('http://localhost:3000/#/dashboard/account');
})

/**
 * @route           /auth/logout
 * @description     Perform a GET request to log user out of session. 
 *                  Then deletes the session's cookie and redirect back to home page
 */
router.get("/logout", (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  res.redirect('http://localhost:3000');
})

/**
 * @route           /auth/login/success
 * @description     When user is logged in this route will be used to access user data
 */
router.get("/login/success", (req, res) => {
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