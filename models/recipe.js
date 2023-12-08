const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
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
        ingredients: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Inventory',
                    required: true,
                },
                quantityRequired: {
                    type: Number,
                    required: true,
                    min: 0.0001,
                    max: 10000,
                },
            },
        ],
        serves: {
            type: Number,
            required: true,
            min: 1,
            max: 10000,
        },
        method: [
            {
                type: String,
                maxlength: 500,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Recipe', recipeSchema);
