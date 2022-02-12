module.exports = {
    name: 'messageCreate',
    execute(message) {
        console.log(message.author.username+" sent the following message to the bot: \""+message.content+"\"");
    }
}