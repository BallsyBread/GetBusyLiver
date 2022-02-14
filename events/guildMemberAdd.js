let {welcomemessage} = require("../strings/en-US");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        //fetch member's guild's channels
        let memberguildchannels = await member.guild.channels.fetch();
        //fetch
        let mainchannel = memberguildchannels.find(channel => channel.name === "welcome");
        //send joiner a message in welcome channel with Mention
        mainchannel.send(welcomemessage(member.user));
    }
};
