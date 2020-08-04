const express = require('express');
const router = express.Router();

//Import passport for access to authentication strategies
const passport = require('passport');

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

router.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie('connect.sid');
    res.redirect('http://localhost:3000');
})

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
router.get('/login/google/callback', passport.authenticate('google-login', {failureRedirect: 'http://localhost:3000/#/login/'}), (req,res) => {
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
router.get('/register/google/callback', passport.authenticate('google-register', {failureRedirect: 'http://localhost:3000/#/register/'}), (req,res) => {
    res.redirect('http://localhost:3000/#/dashboard/account');
})

module.exports = router;