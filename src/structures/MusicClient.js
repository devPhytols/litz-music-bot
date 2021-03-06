const { Manager } = require("@lavacord/discord.js");
const { Client, Collection } = require("discord.js");
const { promises: { readdir } } = require("fs");
const { join } = require("path");
const { LavasfyClient } = require("lavasfy");
const config = require("../config/config");
const client = new Client();
const disbut = require('discord.js-buttons')(client);
require("../extensions");

module.exports = class MusicClient extends Client {
    /** @param {import("discord.js").ClientOptions} [opt] */
    constructor(opt) {
        super(opt);
        this.commands = new Collection();
        this.manager = new Manager(this, [
            {
                id: "main",
                host: config.discord.LAVA_HOST,
                port: config.discord.LAVA_PORT,
                password: config.discord.LAVA_PASS
            }
        ]);
        this.spotify = config.discord.ENABLE_SPOTIFY === "true"
            ? new LavasfyClient({
                clientID: config.discord.SPOTIFY_ID,
                clientSecret: config.discord.SPOTIFY_SECRET,
                playlistLoadLimit: config.discord.SPOTIFY_PLAYLIST_PAGE_LIMIT,
                audioOnlyResults: true,
                useSpotifyMetadata: true,
                autoResolve: true
            }, [...[...this.manager.nodes.values()]])
            : null;

        this.prefix = config.discord.PREFIX.toLowerCase();
    }

    build() {
        this.loadCommands();
        this.loadEventListeners();
        this.login(config.discord.TOKEN);

        this.manager
            .on("ready", node => console.log(`Arquivo ${node.id} carregado!`))
            .on("disconnect", (ws, node) => console.log(`Node ${node.id} disconnected.`))
            .on("reconnecting", (node) => console.log(`Node ${node.id} tries to reconnect.`))
            .on("error", (error, node) => console.log(`Node ${node.id} got an error: ${error.message}`));
    }

    /** @private */
    async loadCommands() {
        const commands = await readdir(join(__dirname, "..", "commands"));
        for (const commandFile of commands) {
            const command = require(`../commands/${commandFile}`);
            this.commands.set(command.name, command);
        }
    }

    /** @private */
    async loadEventListeners() {
        const listeners = await readdir(join(__dirname, "..", "listeners"));
        for (const listenerFile of listeners) {
            const listener = require(`../listeners/${listenerFile}`);
            this.on(listener.name, (...args) => listener.exec(this, ...args));
        }
    }
};
