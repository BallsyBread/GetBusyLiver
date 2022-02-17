module.exports = {
    name: 'messageCreate',
    async execute(message) {
        //check if message is by bot and handle appropriately, then return if true
        if (message.author.bot) {
            //handle message is by a Bot

            return;
        }
        //handle message is not by a Bot

        //check if message is a DM and handle appropriately, then return if true
        if (message.channel.type === "DM") {
            //handle is a dm

            return;
        }
        //handle message is not DM and not by a Bot

        //check if message is not welcome channel and handle appropriately, then return if true
        if (message.channel.name !== "welcome") {
            //handle message is not in welcome channel

            return;
        }
        //handle message is in welcome channel, is not a DM and is not by a Bot

        //check if message is not a reply and handle appropriately, then return if true
        if (message.type !== "REPLY") {
            //handle message is not a reply

            //delete the message that was sent (as it's not the reply we're looking for)
            message.delete();
            return;
        }
        //handle message is a reply, is in welcome channel, is not a DM and is not by a Bot

        //fetch message that this message was a reply to from messages in channel that this message was sent to
        let authmessage = await message.channel.messages.fetch(message.reference.messageId);
        //check if Reference Message doesn't have a mention of the author that sent a reply or isn't from a Bot and handle appropriately, then return if true
        if (!authmessage.mentions.has(message.author) || !authmessage.author.bot) {
            //delete the message that was sent (as it is not the reply we're looking for)
            message.delete();
            return;
        }
        //handle message reference has mention of author, message reference is by a Bot, message is a reply, is in welcome channel and is not by a Bot
        //set nickname to message content
        await message.member.setNickname(message.content);
        //TODO: logic to add user to member role
        //delete the message (as it was the message we were looking for)
        message.delete();
        //delete message reference as the user is now verified
        authmessage.delete();
    }
};
