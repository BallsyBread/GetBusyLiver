let {roleerror, channelerror} = require("../strings/en-US");

function leave(guild) {
    guild.leave().then((g) => console.log("left guild: "+g.toString())).catch(e => {console.log(e)});
}

async function countMemberRoles(guild, owner) {
    if (guild.roles.cache.filter(role => role.name === "member").size !== 1) {
        await owner.send(roleerror);
        console.log(roleerror);
        leave(guild);
    }
}

async function countWelcomeChannels(guild, owner) {
    if (guild.channels.cache.filter(channel => channel.name === "welcome").size !== 1) {
        await owner.send(channelerror);
        console.log(channelerror);
        leave(guild);
    }
}

async function checkPrerequisites(guild) {
    let owner = await guild.members.fetch(guild.ownerId);
    //fetch a new DM channel with owner
    await countMemberRoles(guild, owner);
    await countWelcomeChannels(guild, owner);
}

async function cleanWelcome(guild) {
    let channelmessages = await guild.channels.cache.find(channel => channel.name === "welcome").messages.fetch();
    await channelmessages.filter(msg => !msg.author.bot).forEach(msg => msg.delete());
    console.log("All non Bot messages have been deleted from welcome channel in clan "+guild.name);
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //check if all guilds still have only one welcome channel and leave if not the case
        client.guilds.cache.forEach(guild => checkPrerequisites(guild));
        client.guilds.cache.forEach(guild => cleanWelcome(guild));
        //TODO: add logic to figure out if someone joined while they were gone and send them a authmessage on the welcome channel
    }
}