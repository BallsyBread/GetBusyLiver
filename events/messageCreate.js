module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.type === "DM") {
            //handle dm
            console.log("Message is a DM");
            return;
        }
        if (message.channel.name !== "welcome") {
            //handle message is not in welcome channel
            console.log("Message was not sent to welcome channel");
            return;
        }
        //handle message is in welcome channel
        console.log("Message has been sent to welcome channel");
        //handle message is not a reply
        if (message.mentions.repliedUser === null) {
            console.log("Message was not a reply");
            message.delete();
            console.log("Message will now be deleted");
            return;
        }
        //handle message is a reply
        console.log("Message is a reply");
        //fetch message that this message was a reply to
        let authmessage = await message.channel.messages.fetch(message.reference.messageId);
        //check if fetched message has a mention of the author of the recieved message, set author's nick to message content and delete the reference message
        if (!authmessage.mentions.has(message.author) || !authmessage.author.bot) {
            console.log("Message was a reply to something different");
            message.delete();
            console.log("Message will now be deleted");
            return;
        }
        console.log("Message that this message was a reply to has a mention of the author and is by a bot.");
        await message.member.setNickname(message.content);
        //TODO: logic to add user to member role
        message.delete();
        authmessage.delete();
    }
};
