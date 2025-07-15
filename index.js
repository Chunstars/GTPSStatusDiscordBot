const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
const mongoose = require('mongoose');
const path = require('path');

const config = yaml.load(fs.readFileSync('./configs/config.yaml', 'utf8'));

if (!['dropdown', 'button'].includes(config.mode)) {
    throw new Error('InvalidModeLiveStock: mode must be dropdown or button');
}

mongoose.connect(config.mongodb_url, {
    dbName: 'auto_store',
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

client.commands = new Collection();

for (const ext of config.extensions) {
    try {
        require(`./${ext}`)(client);
        console.log(`✅ Loaded extension: ${ext}`);
    } catch (err) {
        console.error(`❌ Failed to load extension: ${ext}`, err);
    }
}

client.login(config.token);
require('./interactions/buttons')(client);
require('./interactions/modals')(client);