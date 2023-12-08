const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                let user = await User.findOne({ 'googleAuth.id': profile.id });
                if (user) {
                    return cb(null, user);
                }
                user = await User.create({
                    googleAuth: {
                        id: profile.id,
                        displayName: profile.displayName,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value,
                    },
                });
                return cb(null, user);
            } catch (err) {
                console.log(err);
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    console.log('serialiseUser', user.id);
    cb(null, user.id);
});

passport.deserializeUser(async (userId, cb) => {
    console.log('deserializeUser', userId);
    cb(null, await User.findById(userId));
});
