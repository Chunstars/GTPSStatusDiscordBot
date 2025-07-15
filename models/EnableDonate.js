const mongoose = require('mongoose');

const EnableDonateSchema = new mongoose.Schema({
    guildId: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('EnableDonate', EnableDonateSchema);