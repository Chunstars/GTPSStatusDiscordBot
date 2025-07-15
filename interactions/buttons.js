const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'submit_growid') {
      const modal = new ModalBuilder()
        .setCustomId('modal_growid')
        .setTitle('Submit Your GrowID');

      const growidInput = new TextInputBuilder()
        .setCustomId('growid_input')
        .setLabel("What's your GrowID?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const row = new ActionRowBuilder().addComponents(growidInput);
      modal.addComponents(row);

      await interaction.showModal(modal);
    }
  });
};