module.exports = {
    name: 'tag',
    args: 1,
    execute(message, args) {
        console.log(args[0]);
        let guild = message.guild.roles.cache;
        message.channel.send(guild);
    }
}