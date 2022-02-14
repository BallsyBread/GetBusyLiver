module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //TODO: add logic to remove all non bot messages from all welcome channels of all guilds
        //TODO: add logic to figure out if someone joined while they were gone and send them a authmessage on the welcome channel
    }
}