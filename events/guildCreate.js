let {joinmessage, welcomechannelerror} = require("../strings/en-US");

function leave(guild) {
    guild.leave().then((g) => console.log("left guild"+g.toString())).catch(e => {console.log(e)});
}

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        //fetch owner
        let guildowner = await guild.members.fetch(guild.ownerId);
        //fetch a new DM channel with owner
        let dmchannel = await guildowner.createDM();
        //fetch all channels of the guild
        let guildchannels = await guild.channels.fetch();
        //fetch a set (or map i'm not sure) of all channels whose name is welcome
        let welcomechannels = guildchannels.filter(channel => channel.name === "welcome");
        //ensure that size is 1
        if (welcomechannels.size !== 1) {
            console.log("Too many or too few welcome channels");
            //send owner an error message
            dmchannel.send(welcomechannelerror());
            //try to leave the guild
            leave(guild);
            //end event handler
            return;
        }
        welcomechannels.find(channel => channel.name === "welcome").send("Hello");
        dmchannel.send(joinmessage(guildowner.user));
    }
};
