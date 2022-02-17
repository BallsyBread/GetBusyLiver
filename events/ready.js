const Collection = require("@discordjs/collection");
let {welcomemessage, joinmessage, roleerror, channelerror} = require("../strings/en-US");

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

function createAuthMessages(channel, users) {
    users.forEach(user => channel.send(welcomemessage(user)));
}

function removeMentions(channel, mentionedusers) {
    mentionedusers.forEach(user => channel.send(welcomemessage(user)));
}

async function verifierCatchUp(guild) {
    //get all members of guild
    let members = await guild.members.fetch();
    //get members that don't have a nick
    let nonickmembers = members.filter(member => (!member.nickname) && (!member.user.bot));
    //create an empty collection
    let mentionedusers = new Collection.Collection();

    //get guild channels, welcome channel and messages in there
    let guildchannels = await guild.channels.fetch();
    let welcomechannel = guildchannels.find(channel => channel.name === "welcome");
    let messages = await welcomechannel.messages.fetch();

    //go through all messages and add the mentioned users to the empty collection, except if there are none
    messages.forEach(msg => {
        if (msg.mentions.users.size === 0) return;
        mentionedusers.set(msg.mentions.users.first().id, msg.mentions.users.first());
    });

    //do nothing if there's the same amount of people with no nicknames as there is mentioned usernames in the welcome channel
    if (mentionedusers.size === nonickmembers.size) return;

    //if there's more people without nicks, create missing authmessages
    if (mentionedusers.size < nonickmembers.size) {
        //filter the following from Members without Nicks: all the members that have not been mentioned
        let userstobementioned = nonickmembers.filter(nonickmember => !mentionedusers.has(nonickmember.user.id));
        createAuthMessages(welcomechannel, userstobementioned);
        return;
    }

    //if there's more people mentioned in welcome, remove the surplus of mentions
    if (mentionedusers.size > nonickmembers.size) {
        //filter the following from Mentioned Users: all the users that are still on the server (or at least in the nonick variable)
        let mentionstoberemoved = mentionedusers.filter(mentionuser => !nonickmembers.has(mentionuser));
        removeMentions(welcomechannel, mentionstoberemoved);
        console.log(mentionstoberemoved);
    }
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //check if all guilds still have only one welcome channel and leave if not the case
        client.guilds.cache.forEach(guild => checkPrerequisites(guild));
        client.guilds.cache.forEach(guild => cleanWelcome(guild));
        client.guilds.cache.forEach(guild => verifierCatchUp(guild));
        //TODO: add logic to figure out if someone joined while they were gone and send them a authmessage on the welcome channel
    }
}