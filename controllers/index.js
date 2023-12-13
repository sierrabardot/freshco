const passport = require('passport');

module.exports = {
    index,
    googleOAuth,
    googleOAuthCallback,
    logout,
    dashboard,
};

// Home page
function index(req, res) {
    res.render('index', { title: 'Home' });
}

// Login route
function googleOAuth(req, res) {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })(req, res);
}

// Login callback -> successful login will redirect to dashboard
function googleOAuthCallback(req, res) {
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
    })(req, res);
}

// Logout route
function logout(req, res) {
    req.logout(function () {
        res.redirect('/');
    });
}

// Dashboard will render upon successful Google OAuth login
function dashboard(req, res) {
    res.render('dashboard', { title: 'Dashboard' });
}
