const passport = require('passport');

module.exports = {
    index,
    googleOAuth,
    googleOAuthCallback,
    logout,
};

function index(req, res) {
    res.render('index', { title: 'Inventory Management' });
}

function googleOAuth(req, res) {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })(req, res);
}

function googleOAuthCallback(req, res) {
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/',
    })(req, res);
}

function logout(req, res) {
    req.logout(function () {
        res.redirect('/');
    });
}
