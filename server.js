require('dotenv').config();
require('./config/database');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

const inventoryRouter = require('./routes/inventory');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/inventory', inventoryRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
