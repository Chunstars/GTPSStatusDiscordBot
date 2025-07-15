const mongoose = require('mongoose');

const RateDLSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RateDL', RateDLSchema);