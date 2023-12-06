const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
    },
    quantityAvailable: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);
