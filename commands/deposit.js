const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Deposit = require('../models/Deposit');
const EnableDonate = require('../models/EnableDonate');
const EnableTrakteer = require('../models/EnableTrakteer');
const EnableSaweria = require('../models/EnableSaweria');
const EnableSociabuzz = require('../models/EnableSociabuzz');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName !== 'deposit') return;

        if (interaction.options.getSubcommand() === 'non-qris') {
            await interaction.deferReply({ ephemeral: true });

            const data = await Deposit.findOne({ guildId: interaction.guildId });
            if (!data) {
                return interaction.editReply({ content: '❌ Deposit data not found.' });
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel("Submit GrowID")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("submit_growid")
            );

            const embeds = [];

            if (data.growtopia) {
                const donateEnabled = await EnableDonate.findOne({ guildId: interaction.guildId });
                if (!donateEnabled || donateEnabled.status) {
                    embeds.push(new EmbedBuilder()
                        .setDescription(`**World Deposit ${interaction.guild.name}**
\`\`\`yml\nWorld: ${data.growtopia.world}\nOwner: ${data.growtopia.owner}\nBot: ${data.growtopia.bot}\`\`\``)
                        .setColor('Green')
                        .setImage(data.thumbnail));
                }
            }

            if (data.trakteer) {
                const tkt = await EnableTrakteer.findOne({ guildId: interaction.guildId });
                if (!tkt || tkt.status) {
                    embeds.push(new EmbedBuilder()
                        .setDescription(`**Trakteer Link : ${data.trakteer}**`)
                        .setColor('Green')
                        .setImage(data.thumbnail));
                }
            }

            if (data.saweria) {
                const saweria = await EnableSaweria.findOne({ guildId: interaction.guildId });
                if (!saweria || saweria.status) {
                    embeds.push(new EmbedBuilder()
                        .setDescription(`**Saweria Link : ${data.saweria}**`)
                        .setColor('Green')
                        .setImage(data.thumbnail));
                }
            }

            if (data.sociabuzz) {
                const socia = await EnableSociabuzz.findOne({ guildId: interaction.guildId });
                if (!socia || socia.status) {
                    embeds.push(new EmbedBuilder()
                        .setDescription(`**Sociabuzz Link : ${data.sociabuzz}**`)
                        .setColor('Green')
                        .setImage(data.thumbnail));
                }
            }

            if (embeds.length > 0) {
                await interaction.editReply({ embeds, components: [row] });
            } else {
                await interaction.editReply({ content: '❌ No deposit methods enabled.' });
            }
        }
    });
};