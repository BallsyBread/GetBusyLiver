module.exports = {
    welcomemessage(user) {
        return "Hello "+user.toString()+". Welcome to the clan. Plese reply to this message with your IGN to recieve full access to the server.";
    },
    joinmessage: "Thanks for inviting me to the server. For the bot to work, there needs to be a \"member\" Role as well as a \"#welcome\" TextChannel.",
    roleerror: "There were either zero or more Roles found with the name member. The bot will leave the guild again. Reinvite when the prerequisites are met.",
    channelerror: "There were either zero or more Channels found with the name welcome. The bot will leave the guild again. Reinvite when the prerequisites are met."
}