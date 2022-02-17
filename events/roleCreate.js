module.exports = {
    name: 'roleCreate',
    execute(role) {
        console.log(role.name);
        if (role.name !== "member") return;
        role.guild.fetch().then(guild => guild.members.fetch(guild.ownerId).then(owner => owner.send("As long as this Bot is active, you can not have more than one role that's called member. The Bot will now delete the created role again.")));
        role.delete();
    }
}