let {joinmessage, prerequisiteerror} = require("../strings/en-US");

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

        //fetch all roles of the guild
        let roles = await guild.roles.fetch();
        //fetch a set (or map i'm not sure) of all roles whose name is member
        let memberroles = roles.filter(role => role.name === "member");

        //fetch all channels of the guild
        let guildchannels = await guild.channels.fetch();
        //fetch a set (or map i'm not sure) of all channels whose name is welcome
        let welcomechannels = guildchannels.filter(channel => channel.name === "welcome");

        //ensure that welcomechannels and memberroles size is 1
        if (welcomechannels.size !== 1 || memberroles.size !== 1) {
            console.log("Too many or too few welcome channels and/or member roles");
            //send owner an error message
            dmchannel.send(prerequisiteerror);
            //try to leave the guild
            leave(guild);
            //end event handler
            return;
        }

        //now that we know there's only one instance of the channel, we can use find() to get the main channel
        let mainchannel = welcomechannels.find(channel => channel.name === "welcome");
        //send instructions to welcome channel and pin the message
        mainchannel.send("Hello");
        //send guildowner welcome message
        dmchannel.send(joinmessage);
    }
};
