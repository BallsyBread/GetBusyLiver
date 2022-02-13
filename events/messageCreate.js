module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.mentions.repliedUser === null || !message.inGuild() || message.author.bot) return;
        console.log(message);
    }
};
