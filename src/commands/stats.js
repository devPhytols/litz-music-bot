const prettyMs = require("pretty-ms");
const util = require("../util");

module.exports = {
    name: "stats",
    exec: (msg) => {
        /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];

        msg.channel.send(util.embed()
            .setAuthor("Lavalink Information", msg.client.user.displayAvatarURL())
            .setTitle("devPhytols")
            .setURL("https://github.com/devPhytols")
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                    const uptime = prettyMs(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });

                    return `\`\`\`asciidoc
Lava ID        :: ${node.id}
Lava Status    :: ${node.connected ? "Connected" : "Disconnected"}
${node.connected ? `
CPU Usage  :: ${cpuLoad}%
Mem Usage :: ${memUsage} MB
Lava Uptime    :: ${uptime}
Lava Players   :: ${node.stats.playingPlayers} of ${node.stats.players} playing` : ""}\`\`\``;
                })
            )
            .setTimestamp()
        );
    }
};
