const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Mongoose connected to ${db.host}, using ${db.host}`);
});
