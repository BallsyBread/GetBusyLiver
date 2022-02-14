module.exports = {
    name: 'messageCreate',
    async execute(message) {
        //check if message is DM or from a bot and return if so
        if (!message.inGuild() || message.author.bot) return;
        //fetch channels from guild this message was posted to
        let guildchannels = await message.guild.channels.fetch();
        //find welcomechannel of the guild
        let welcomechannel = guildchannels.find(channel => channel.name === "welcome");
        //check if message that was recieved is the last one in the welcome channel and return if not so
        if (!welcomechannel.lastMessage === message) return;
        //check if message is a reply, delete it and return if not so
        if (message.mentions.repliedUser === null) {
            message.delete();
            return;
        }
        //fetch message that this message was a reply to
        let authmessage = await welcomechannel.messages.fetch(message.reference.messageId);
        //check if fetched message has a mention of the author of the recieved message, set author's nick to message content and delete the reference message
        if (authmessage.mentions.has(message.author) && authmessage.author.bot) {
            await message.member.setNickname(message.content);
            authmessage.delete();
        }
        //delete message
        message.delete();
    }
};
