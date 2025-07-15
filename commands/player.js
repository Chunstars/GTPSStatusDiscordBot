const { EmbedBuilder } = require('discord.js');
const Player = require('../models/Player');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        // /transfer
        if (interaction.commandName === 'transfer') {
            await interaction.deferReply({ ephemeral: true });

            const amount = interaction.options.getInteger('amount');
            const member = interaction.options.getUser('member');

            if (amount <= 0) {
                return interaction.editReply({ content: '❌ Invalid amount.' });
            }

            const sender = await Player.findOne({ discord_id: interaction.user.id });
            const receiver = await Player.findOne({ discord_id: member.id });

            if (!sender || !receiver) {
                return interaction.editReply({ content: '❌ Sender or recipient not found in database.' });
            }

            if (sender.world_lock < amount) {
                return interaction.editReply({ content: '❌ Insufficient balance.' });
            }

            sender.world_lock -= amount;
            receiver.world_lock += amount;
            await sender.save();
            await receiver.save();

            const embed = new EmbedBuilder()
                .setDescription(`✅ Transferred \`${amount} WL\` to \`${receiver.growid}\`.`)
                .setColor('Green');

            await interaction.editReply({ embeds: [embed] });
        }

        // /balance
        if (interaction.commandName === 'balance') {
            await interaction.deferReply({ ephemeral: true });

            const member = interaction.options.getUser('member') || interaction.user;
            const player = await Player.findOne({ discord_id: member.id });

            if (!player) {
                return interaction.editReply({ content: '❌ Player not found in database.' });
            }

            const embed = new EmbedBuilder()
                .setDescription(`**Balance for \`${player.growid}\`**\n\`\`\`yml\nWorld Lock: ${player.world_lock}\nTotal Buy: ${player.total_buy}\`\`\``)
                .setColor('Green')
                .setThumbnail(member.displayAvatarURL());

            await interaction.editReply({ embeds: [embed] });
        }
    });
};