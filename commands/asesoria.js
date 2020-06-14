module.exports = {
    name: 'asesoria',
    aliases: ['a', 'ayuda'],
    async execute(message) {
        let embed = {
            title: 'Asesoría/Ayuda',
            description: 'Haz click a las reacciones para obtener ayuda',
            fields: [{
                    name: 'Arduino',
                    value: '<:ia:721504571775778866>',
                    inline: true
                },
                {
                    name: 'Electrónica',
                    value: 'mecanica',
                    inline: true
                },
                {
                    name: 'Programación',
                    value: ':cry:',
                    inline: true
                },
                {
                    name: 'Programación',
                    value: ':cry:',
                    inline: true
                },
                {
                    name: 'Programación',
                    value: ':cry:',
                    inline: true
                },
                {
                    name: 'Programación',
                    value: ':cry:',
                    inline: true
                },
                {
                    name: 'Programación',
                    value: ':cry:',
                    inline: true
                },
            ]
        }
        message.channel.send({
            embed: embed
        }).then(sentMessage => {
            sentMessage.react('721504571775778866');
            sentMessage.react('721504570127155300');
            sentMessage.react('721504653933543435');
            sentMessage.react('721504570856964116');
            sentMessage.react('721504572316712960');
            sentMessage.react('721504572069249155');
            const filter = (reaction, user) => {
                return ['ia', 'arduino', '<:electronica:721504653933543435>', '721504570856964116', '721504572316712960', '721504572069249155'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector = sentMessage.createReactionCollector(filter, {
                time: 60000
            });
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (reaction.emoji.name === 'ia') {
                    sentMessage.channel.send('<@&721005283576381490>');
                } else if (reaction.emoji.name === 'arduino') {
                    sentMessage.channel.send('<@&721005470239948891>');
                } else if (reaction.emoji.name === '<:electronica:721504653933543435>') {
                    sentMessage.channel.send('<@&721005470239948891>');
                } else if (reaction.emoji.name === '721504570856964116') {
                    sentMessage.channel.send('<@&721005470239948891>');
                } else if (reaction.emoji.name === '721504572316712960') {
                    sentMessage.channel.send('<@&721005470239948891>');
                } else {
                    sentMessage.channel.send('<@&721005470239948891>');
                }
            });

        });
    }
}