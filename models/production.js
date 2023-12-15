const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        stockUsed: [
            {
                ingredientName: {
                    type: Schema.Types.ObjectId,
                    ref: 'Inventory',
                    required: true,
                },
                ingredientBatch: {
                    type: String,
                    required: true,
                },
                quantityUsed: {
                    type: String,
                    required: true,
                },
            },
        ],
        quantityMade: {
            type: Number,
            required: true,
            min: 1,
            max: 10000,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Production', productionSchema);
