const mongoose = require('mongoose');

const EnableSociabuzzSchema = new mongoose.Schema({
    guildId: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('EnableSociabuzz', EnableSociabuzzSchema);