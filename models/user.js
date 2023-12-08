const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        googleAuth: {
            id: {
                type: String,
                required: true,
            },
            displayName: String,
            avatar: String,
            email: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
