const config = require("../config/config");
const fetch = require('node-fetch');
module.exports = {
    name: "ready",
    exec: async (client) => {
        const intervalTime = 60000; // Insert here the interval for doing the request in milliseconds, like now 300000 is equal to 5 minutes
        const lavalinkURL = 'http://161.35.49.198/';
        setInterval(() => {
        fetch(lavalinkURL);
        }, intervalTime)

        // Contador Stats
        setInterval(function () {
            var memberCountChannel = client.channels.cache.get("872231020072677406");
            memberCountChannel.setName(`🧑‍💻 Usuários: ${client.users.cache.size}`);
            var serverCountChannel = client.channels.cache.get("872230986904109146");
            serverCountChannel.setName(`🌎 Servidores: ${client.guilds.cache.size}`);
            var voiceCountChannel = client.channels.cache.get("872231090604093441");
            voiceCountChannel.setName("💫 Shards: 1");}, 45000);
  
        console.log(`Estou Online em: ${client.user.tag}`);

        
        if (client.spotify) await client.spotify.requestToken();

        const nodes = [...client.manager.nodes.values()];
        for (const node of nodes) {
            try {
                await node.connect();
            } catch (e) {
                client.manager.emit("error", e, node);
            }
        }

        const prefix = config.discord.PREFIX;

        const status = [{
            name: `${prefix}help | Online`,
        },
        ];

        setInterval(() => {
            var randomStatus = status[Math.floor(Math.random() * status.length)];
            client.user.setActivity(randomStatus.name, {
                type: "LISTENING" // WATCHING, LISTENING, PLAYING, STREAMING
            });
        }, 10 * 1000);

        client.user.setStatus("online");
    }
};
