const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Inventory', inventorySchema);
