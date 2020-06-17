module.exports = {
  name: "asesoria",
  aliases: ["a", "ayuda"],
  async execute(message) {
    let embed = {
      color: "#5c0a2a",
      title: "Llama a los expertos",
      description:
        "Haz click a las reacciones para etiquetar a quienes te pueden ayudar",
      fields: [
        {
          name: "Arduino",
          value: "<:arduino:721540923225276456>",
          inline: true,
        },
        {
          name: "Diseño",
          value: "<:diseno:721540923363688448>",
          inline: true,
        },
        {
          name: "Programación",
          value: "<:programacion:721540923762409533>",
          inline: true,
        },
        {
          name: "Modelado/impresión 3D",
          value: "<:3d:722831879199260683>",
          inline: false,
        },
        {
          name: "Electricidad",
          value: "<:electrica:721540923141652492>",
          inline: true,
        },
        {
          name: "Negocios",
          value: "<:negocios:721540923871199313>",
          inline: true,
        },
        {
          name: "Mecánica",
          value: "<:mecanica:721540923712077885>",
          inline: true,
        },
        {
          name: "Inteligencia Artificial",
          value: "<:ia:721540923774861313>",
          inline: true,
        },
      ],
    };
    message.channel
      .send({
        embed: embed,
      })
      .then((sentMessage) => {
        sentMessage.react("721540923225276456");
        sentMessage.react("721540923363688448");
        sentMessage.react("721540923762409533");
        sentMessage.react("722831879199260683");
        sentMessage.react("721540923141652492");
        sentMessage.react("721540923871199313");
        sentMessage.react("721540923712077885");
        sentMessage.react("721540923774861313");
        const filter = (reaction, user) => {
          return (
            [
              "arduino",
              "diseno",
              "programacion",
              "electrica",
              "3d",
              "negocios",
              "mecanica",
              "ia",
            ].includes(reaction.emoji.name) && user.id === message.author.id
          );
        };

        const collector = sentMessage.createReactionCollector(filter, {
          time: 15000,
        });
        collector.on("collect", (reaction, user) => {
          console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
          if (reaction.emoji.name === "electrica") {
            sentMessage.channel.send("<@&721536452856381440>");
          } else if (reaction.emoji.name === "arduino") {
            sentMessage.channel.send("<@&721536723351371796>");
          } else if (reaction.emoji.name === "diseno") {
            sentMessage.channel.send("<@&721536773796134934>");
          } else if (reaction.emoji.name === "mecanica") {
            sentMessage.channel.send("<@&721536796709617754>");
          } else if (reaction.emoji.name === "3d") {
            sentMessage.channel.send("<@&722830356595736656>");
          } else if (reaction.emoji.name === "negocios") {
            sentMessage.channel.send("<@&721536814032355328>");
          } else if (reaction.emoji.name === "programacion") {
            sentMessage.channel.send("<@&721536833573355581>");
          } else {
            sentMessage.channel.send("<@&721536857091080232>");
          }
        });
      });
  },
};
