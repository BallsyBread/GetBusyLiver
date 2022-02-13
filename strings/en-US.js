module.exports = {
    welcomemessage(user) {
        return "Hello "+user.toString()+". Welcome to the clan. Plese reply to this message with your IGN to recieve full access to the server.";
    },
    joinmessage(owner) {
        return "Hello "+owner.toString()+". Thanks for inviting me to the server. For the bot to work, there needs to be a \"member\" Role as well as a \"#welcome\" TextChannel.";
    },
    welcomechannelerror() {
        return "There were either zero or more than one Channels found with the name #welcome";
    }
}