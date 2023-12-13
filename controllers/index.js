const passport = require('passport');

module.exports = {
    index,
    googleOAuth,
    googleOAuthCallback,
    logout,
    dashboard,
};

function index(req, res) {
    res.render('index', { title: 'Home' });
}

function googleOAuth(req, res) {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })(req, res);
}

function googleOAuthCallback(req, res) {
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
    })(req, res);
}

function logout(req, res) {
    req.logout(function () {
        res.redirect('/');
    });
}

function dashboard(req, res) {
    res.render('dashboard', { title: 'Dashboard' });
}
