const { SlashCommandBuilder } = require('discord.js');
const ModeLiveStock = require('../models/ModeLiveStock');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName !== 'set') return;

        if (interaction.options.getSubcommand() === 'mode-live-stock') {
            await interaction.deferReply({ ephemeral: true });

            const mode = interaction.options.getString('mode');
            if (!['dropdown', 'button'].includes(mode)) {
                return interaction.editReply({ content: '❌ Invalid mode. Use `dropdown` or `button`.' });
            }

            const result = await ModeLiveStock.findOneAndUpdate(
                { guildId: interaction.guildId },
                { mode: mode },
                { upsert: true, new: true }
            );

            await interaction.editReply({
                content: `✅ Live stock mode set to \`${mode}\`.`
            });
        }
    });
};