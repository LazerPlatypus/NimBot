const gameController = require('../helper_methods/GameController');
module.exports = {
    name: "end",
    description: "End the current game.",
    aliases: ["quit"],
    guildOnly: false,
    args: false,
    usage: "Enter the command without arguments.",
    cooldown: false,
    cooldowntime: 0,
    execute(message, args) {
        let error = gameController.endGame(message.author.username);
        if (error) {
            message.reply(error);
        } else {
            message.reply("Game ended");
        }
    }
};