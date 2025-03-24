const { Schema, model } = require('mongoose');

const analyticsSchema = new Schema({
    event: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    data: { type: Object, required: true }
});

const Analytics = model('Analytics', analyticsSchema);

module.exports = Analytics; 