const util = require("../util");

const unlisted = ["eval", "source"];

const { MessageButton } = require("discord.js-buttons");

module.exports = {
    name: "help",
    aliases: ["commands", "?"],
    exec: (msg) => {
        const commands = msg.client.commands
            .filter(c => !unlisted.includes(c.name))
            .map(c => `\`${c.name}\``);

        const embed = util.embed()
            .setAuthor(`${msg.client.user.username} - Help Center`, msg.client.user.displayAvatarURL())
            .setDescription(`Welcome to the Litz help center, below you find my currently available commands, the Litz itself is a simplified distribution from Kosame Bot, so you get all the premium music features for free!\n\n<:traco_litz:872861580491100260> **Command List**\n${commands.join(", ")}`)
            .setTimestamp();

        let button = new MessageButton()
            .setStyle('url') //default: blurple
            .setLabel("Vote for me!") //default: NO_LABEL_PROVIDED
            .setURL('https://top.gg/bot/850383194422247484'); //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        let button2 = new MessageButton()
            .setStyle('url') //default: blurple
            .setLabel("Support Server") //default: NO_LABEL_PROVIDED
            .setURL('https://discord.gg/S2u9ZyQKnX'); //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        msg.channel.send({ buttons: [
            button, button2
        ], embed: embed });
    }
};
