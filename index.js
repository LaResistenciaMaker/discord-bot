const fs = require('fs');
const Discord = require('discord.js');
let prefix = process.env.PREFIX;
let token = process.env.TOKEN;


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// const commandFiles2 = fs.readdirSync('./test_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
// for (const file of commandFiles2) {
//     const command = require(`./test_commands/${file}`);
//     client.commands.set(command.name, command);
// }

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // obtener un array con los args sacandole el prefix y separando por espacios pero considerando los entre comillas como un arg, regex recuperado de https://stackoverflow.com/questions/9577930/regular-expression-to-select-all-whitespace-that-isnt-in-quotes
    const args = message.content.slice(prefix.length).split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        return message.channel.send('No encontré ese comando, prueba escribiendo \`>help\`');
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('No puedo ejecutar ese comando en DM\'s!');
    }

    if (command.args && !args.length) {
        let embed = {
            author: {
                name: `⚠️ Este comando necesita args`
            },
            description: `El uso correcto es: \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send({
            embed
        });
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`por favor espera ${timeLeft.toFixed(1)} segundo(s) más antes de reusar el comando \`${command.name}\`.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error ejecutando este comando :(');
    }
});

client.login(token);