const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
    guildId: String,
    growtopia: {
        world: String,
        owner: String,
        bot: String
    },
    trakteer: String,
    saweria: String,
    sociabuzz: String,
    thumbnail: String
});

module.exports = mongoose.model('Deposit', DepositSchema);