module.exports = {
    name: 'channelUpdate',
    execute(oldchannel, newchannel) {
        if (newchannel.name !== "welcome") return;
        newchannel.guild.fetch().then(guild => guild.members.fetch(guild.ownerId).then(owner => owner.send("As long as this Bot is active, you can not have more than one channel that's called welcome. The Bot will now delete the created channel again.")));
        newchannel.setName(oldchannel.name);
    }
}