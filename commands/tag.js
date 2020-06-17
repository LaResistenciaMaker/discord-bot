module.exports = {
    name: 'tag',
    execute(message) {
        let guild = message.guild.roles.cache;
        guild.each(role => message.author.send(role.name + role.id));
    }
}