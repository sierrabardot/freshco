require('dotenv').config();
require('./config/database');
require('./config/passport');

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

const inventoryRouter = require('./routes/inventory');
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
