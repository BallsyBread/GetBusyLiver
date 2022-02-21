const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with User Tag and User Id'),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};