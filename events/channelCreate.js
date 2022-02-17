module.exports = {
    name: 'channelCreate',
    execute(channel) {
        if (channel.name !== "welcome") return;
        channel.guild.fetch().then(guild => guild.members.fetch(guild.ownerId).then(owner => owner.send("As long as this Bot is active, you can not have more than one channel that's called welcome. The Bot will now delete the created channel again.")));
        channel.delete();
    }

}