let {welcomemessage} = require("../strings/en-US");

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        let mainchannel;
        //fetch main channel and log on error
        member.guild.channels.fetch().then(collection => mainchannel = collection.filter(channel => channel.name === "welcome")).catch(e => console.log(e));
        //send joiner a message in welcome channel with Mention
        mainchannel.send(welcomemessage(member.user));
    }
};
