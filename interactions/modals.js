const Player = require('../models/Player');

module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'modal_growid') {
      const growid = interaction.fields.getTextInputValue('growid_input');
      const discord_id = interaction.user.id;

      let player = await Player.findOne({ discord_id });

      if (!player) {
        player = new Player({ discord_id, growid });
      } else {
        player.growid = growid;
      }

      await player.save();

      await interaction.reply({
        content: `✅ Your GrowID has been saved as \\`${growid}\\`.`,
        ephemeral: true,
      });
    }
  });
};