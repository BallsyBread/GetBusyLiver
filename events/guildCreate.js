let {joinmessage, channelerror, roleerror} = require("../strings/en-US");

function leave(guild) {
    guild.leave().then((g) => console.log("left guild"+g.toString())).catch(e => {console.log(e)});
}

async function hasOneMemberRole(guild, owner) {
    let roles = await guild.roles.fetch();
    if (roles.filter(role => role.name === "member").size !== 1) {
        await owner.send(roleerror);
        console.log(roleerror);
        return false;
    }
    return true;
}

async function hasOneWelcomeChannel(guild, owner) {
    let guildchannels = await guild.channels.fetch();
    if (guildchannels.filter(channel => channel.name === "welcome").size !== 1) {
        await owner.send(channelerror);
        console.log(channelerror);
        return false;
    }
    return true;
}

async function prerequisitesMet(guild) {
    let owner = await guild.members.fetch(guild.ownerId);
    //fetch a new DM channel with owner
    if (await hasOneWelcomeChannel(guild, owner) && await hasOneMemberRole(guild, owner)) {
        await owner.send(joinmessage);
        return true;
    }
    return false;
}

module.exports = {
    name: 'guildCreate',
    async execute(guild) {

        console.log(prerequisitesMet(guild));
        //ensure that welcomechannels and memberroles size is 1
        if (!await prerequisitesMet(guild)) {
            //try to leave the guild
            leave(guild);
            //end event handler
            return;
        }

        //now that we know there's only one instance of the channel, we can use find() to get the main channel
        let mainchannel = guild.channels.cache.find(channel => channel.name === "welcome");
        //send instructions to welcome channel and pin the message
        mainchannel.send("Hello");
        //send guildowner welcome message

    }
};
