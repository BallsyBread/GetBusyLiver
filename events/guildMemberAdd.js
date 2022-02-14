let {welcomemessage} = require("../strings/en-US");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        //cancel if Bot joined a Guild
        if (member.bot) return;
        //fetch member's guild's channels
        let memberguildchannels = await member.guild.channels.fetch();
        //find channel with the name welcome
        let mainchannel = memberguildchannels.find(channel => channel.name === "welcome");
        //send joiner a message in welcome channel with Mention
        mainchannel.send(welcomemessage(member.user));
    }
};
