let {prerequisiteerror} = require("../strings/en-US");

function leave(guild) {
    guild.leave().then((g) => console.log("left guild"+g.toString())).catch(e => {console.log(e)});
}

async function checkPrerequisites(guild) {
    let welcomechannels = guild.channels.cache.filter(channel => channel.name === "welcome");
    let memberroles = guild.roles.cache.filter(role => role.name === "member");
    let guildowner = await guild.members.fetch(guild.ownerId);
    //fetch a new DM channel with owner
    let dmchannel = await guildowner.createDM();
    if (welcomechannels.size !== 1 || memberroles.size !== 1) {
        console.log("Too many or too few welcome channels");
        //send owner an error message
        dmchannel.send(prerequisiteerror);
        //try to leave the guild
        leave(guild);
        //end event handler
    }
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //check if all guilds still have only one welcome channel and leave if not the case
        client.guilds.cache.forEach(guild => checkPrerequisites(guild));
        //TODO: add logic to figure out if someone joined while they were gone and send them a authmessage on the welcome channel
    }
}