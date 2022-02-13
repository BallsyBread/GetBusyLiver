let {welcomemessage} = require("../strings/en-US");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        let channels = await member.guild.channels.fetch();
        channels.find(channel => channel.name === "welcome").send(welcomemessage(member.user));
    }
};
