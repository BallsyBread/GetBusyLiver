let {joinmessage, welcomechannelerror} = require("../strings/en-US");

function leave(guild) {
    guild.leave().then((g) => console.log("left guild"+g.toString())).catch(e => {console.log(e)});
}

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        let guildowner;
        let dmchannel;
        let mainchannel;

        try {
            // try to fetch guild owner as member, leave if not successful
            await guild.members.fetch(guild.ownerId).then(owner => guildowner = owner);
            // try to createDM channel with Owner, leave if not successful
            await guildowner.createDM().then(channel => dmchannel = channel);
            // try to fetch all guild channels, leave if not successful
            await guild.channels.fetch().then(collection => mainchannel = collection.filter(channel => channel.name === "welcome"));
        }
        catch(e) {
            //log error
            console.log(e);
            //leave guild on error
            leave(guild);
        }
        //send Owner joinmessage
        dmchannel.send(joinmessage(guildowner.toString()));

        if (mainchannel.size !== 1) {
            console.log("Too many or too few welcome channels");
            dmchannel.send(welcomechannelerror());
            leave(guild);
            return;
        }
        mainchannel.send("Hello");
    }
};
