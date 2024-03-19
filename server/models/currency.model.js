const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    currency: {
        type: String,
        trim: true,
        required: [true, 'Please select currency'],
        default: "INR"
    }
}, {
    timestamps: true
});

mongoose.model('Currency', currencySchema);