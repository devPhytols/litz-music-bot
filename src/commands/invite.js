const util = require("../util");
module.exports = {
    name: "invite",
    exec: (msg) => {		
        msg.channel.send(
            util.embed()
                .setTitle("Invite Litz")
                .setDescription("**Add me to your server!**\n\nTo invite me click on the links below \n\n **Litz Music**: [Invite](https://dsc.gg/litzbot)\n\n **Support Server**: [Enter](https://discord.com/invite/S2u9ZyQKnX)")
                .setColor("#0cb000")
                .setFooter("© Litz Music - https://kosamebot.club")
        );
    }
};
