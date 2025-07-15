const mongoose = require('mongoose');

const ModeLiveStockSchema = new mongoose.Schema({
    guildId: String,
    mode: {
        type: String,
        enum: ['dropdown', 'button'],
        required: true
    }
});

module.exports = mongoose.model('ModeLiveStock', ModeLiveStockSchema);