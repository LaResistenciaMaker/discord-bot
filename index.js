const Discord = require('discord.js');
const {
    token
} = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`En ${client.guilds.size} servidores!`);
});

client.on('message', msg => {

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

});

client.login(token);