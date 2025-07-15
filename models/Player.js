const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    discord_id: String,
    growid: String,
    world_lock: {
        type: Number,
        default: 0
    },
    total_buy: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Player', PlayerSchema);