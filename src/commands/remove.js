const util = require("../util");

module.exports = {
    name: "remove",
    aliases: ["rm"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("❌|  Currently not playing anything."));
        if (!music.queue.length) return msg.channel.send(util.embed().setDescription("<a:unchecked:865931554650718249> Queue is empty."));

        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("<a:unchecked:865931554650718249> You must be on a voice channel."));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`<a:unchecked:865931554650718249> You must be on ${msg.guild.me.voice.channel} to use this command.`));

        if (!args[0]) return msg.channel.send(util.embed().setDescription("<a:unchecked:865931554650718249> Missing args."));

        let iToRemove = parseInt(args[0], 10);
        if (isNaN(iToRemove) || iToRemove < 1 || iToRemove > music.queue.length)
            return msg.channel.send(util.embed().setDescription("<a:unchecked:865931554650718249> Invalid number to remove."));

        const removed = music.queue.splice(--iToRemove, 1)[0];
        msg.channel.send(util.embed().setDescription(`<a:certo:865931553628356629> Removed **${removed.info.title}** from the queue.`));
    }
};
