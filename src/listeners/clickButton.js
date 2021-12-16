module.exports = {
    name: "clickButton",
    exec: async (button) => {
        if (button.id === 'clickhelp') {
            button.channel.send(`aaaa clicked button!`);
        }
    }
};
