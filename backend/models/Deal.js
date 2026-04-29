const mongoose = require('mongoose');

const dealSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        originalPrice: {
            type: Number,
            required: true
        },
        discount: {
            type: Number
        },
        platform: {
            type: String,
            required: true
        },
        link: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;