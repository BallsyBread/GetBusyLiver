module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.mentions.repliedUser === null || !message.inGuild() || message.author.bot) return;
        let welcomechannel = await message.guild.channels.fetch(message.reference.channelId);
        let authmessage = await welcomechannel.messages.fetch(message.reference.messageId);
        if (authmessage.mentions.has(message.author) && authmessage.author.bot) {
            welcomechannel.send("You just replied to my mention.");
        }
    }
};
