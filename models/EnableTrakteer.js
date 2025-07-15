const mongoose = require('mongoose');

const EnableTrakteerSchema = new mongoose.Schema({
    guildId: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('EnableTrakteer', EnableTrakteerSchema);