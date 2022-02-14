module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (!message.inGuild() || message.author.bot) return;
        let guildchannels = await message.guild.channels.fetch();
        let welcomechannel = guildchannels.find(channel => channel.name === "welcome");
        if (!welcomechannel.lastMessage === message) return;
        if (message.mentions.repliedUser === null) {
            message.delete();
            return;
        }
        let authmessage = await welcomechannel.messages.fetch(message.reference.messageId);
        if (authmessage.mentions.has(message.author) && authmessage.author.bot) {
            await message.member.setNickname(message.content);
            authmessage.delete();
        }
        message.delete();
    }
};
