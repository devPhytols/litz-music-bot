const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
module.exports = {
    name: "message",
    exec: async (client, msg) => {
        if (!msg.guild) return;
        if (msg.author.bot) return;     

        const prefix = msg.content.toLowerCase().startsWith(client.prefix) ? client.prefix : `<@!${client.user.id}>`;
        if (!msg.content.toLowerCase().startsWith(prefix)) return;

        if (msg.content.match(GetMention(client.user.id))) {
            msg.channel.send({
              embed: {
                color: "#0cb000",
                description: `Current Prefix: \`${client.prefix}\``,
              },
            });
          }
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (command) {
            try {
                await command.exec(msg, args);
            } catch (e) {
                console.error(e);
            }
        }
    }
};
