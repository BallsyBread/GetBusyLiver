module.exports = {
    name: 'roleUpdate',
    execute(oldrole, newrole) {
        if (newrole.name !== "member") return;
        newrole.guild.fetch().then(guild => guild.members.fetch(guild.ownerId).then(owner => owner.send("As long as this Bot is active, you can not have more than one role that's called member. The Bot will now rename the role to the old name.")));
        newrole.setName(oldrole.name);
    }
}