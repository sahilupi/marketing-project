const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    razorPayOrderId: {
        type: String
    },
    orderDetails: {
        paymentStatus: {
            type: String,
            trim: true,
            enum: ['Failed', 'Pending', 'Processing', 'Success'],
            default: 'Pending'
        },
        payableTotal: {
            type: Number,
            trim: true
        },
        planPrice: {
            type: Number,
            trim: true
        },
        youtubeLink: {
            type: String,
            trim: true,
            required: [true, 'Youtube link can\'t be empty']
        },
        targetAndWants: {
            type: Array,
            trim: true
        },
        gender: {
            type: String,
            trim: true
        },
        age: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true,
            required: [true, 'Location can\'t be empty']
        },
        country: {
            type: String,
            trim: true
        },
        currency: {
            type: String,
            required: [true, 'Please enter currency type'],
            default: "INR"
        },
        videoCategory: {
            type: String,
            trim: true
        },
        keywords: {
            type: String,
            trim: true
        },
        budget: {
            type: Number,
            trim: true
        },
        views: {
            type: Number,
            trim: true
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'Order owner is required'],
        ref: 'User'
    },
    orderSessionId: {
        type: String || null,
        trim: true
    }
}, {
    timestamps: true
});

mongoose.model('Order', orderSchema);