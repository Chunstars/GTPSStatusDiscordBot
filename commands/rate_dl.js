const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const RateDL = require('../models/RateDL');

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

function calculateRate(rate, rupiah) {
    return Math.floor((rupiah / rate) * 100); // assuming 1 DL = 100 WL
}

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'rate_dl') {
            await interaction.deferReply({ ephemeral: true });

            const rdl = await RateDL.findOne({});
            if (!rdl) {
                return interaction.editReply({
                    content: '❌ Rate DL not available.'
                });
            }

            const embed = new EmbedBuilder()
                .setDescription(`**Rate DL : \`${formatRupiah(rdl.rate)}\`**`)
                .setColor('Green');

            await interaction.editReply({ embeds: [embed] });
        }

        if (interaction.commandName === 'calc_dl') {
            await interaction.deferReply({ ephemeral: true });

            const rupiah = interaction.options.getNumber('rupiah');
            const rdl = await RateDL.findOne({});
            if (!rdl) {
                return interaction.editReply({
                    content: '❌ Rate DL not available for calculation.'
                });
            }

            const totalWL = calculateRate(rdl.rate, rupiah);

            const embed = new EmbedBuilder()
                .setDescription(`**\`${formatRupiah(rupiah)}\` = \`${totalWL} World Locks\`**`)
                .setColor('Green');

            await interaction.editReply({ embeds: [embed] });
        }
    });
};