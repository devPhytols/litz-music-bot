const util = require("../util");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "nowplay"],
    exec: (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("<a:unchecked:865931554650718249> Currently not playing anything."));
        const progress = util.progress(music.player.state.position, music.current.info.length);
        msg.channel.send(util.embed().setDescription(`<a:z_oblackworld:865932097687781396> Now playing ${music.current.info.isStream ? "[**◉ LIVE**]" : ""}\n**${music.current.info.title}**.${music.current.info.isStream ? "" : `\n\n${util.millisToDuration(music.player.state.position)} ${progress.bar} ${util.millisToDuration(music.current.info.length)}`}`));
    }
};
