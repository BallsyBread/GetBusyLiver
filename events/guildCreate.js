let {joinmessage} = require("../strings/en-US");

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        guild.members.fetch(guild.ownerId).then(owner => owner.createDM().then(channel => channel.send(joinmessage(owner))));
    }
};
