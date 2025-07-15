const mongoose = require('mongoose');

const EnableSaweriaSchema = new mongoose.Schema({
    guildId: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('EnableSaweria', EnableSaweriaSchema);