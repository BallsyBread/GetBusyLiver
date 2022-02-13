function log(text) {
    console.log(new Date().toLocaleDateString("de-CH")+": "+text);
}

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (!message.inGuild() || message.author.bot) return;
        if (message.mentions.repliedUser.bot && message.repliedUser.username === "GetBusyLiver") console.log("Bingo!");
    }
};
