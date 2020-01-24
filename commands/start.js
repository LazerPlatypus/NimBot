const GameController = require('../helper_methods/GameController.js');
module.exports = {
    name: "start",
    description: "Start the game of NIM.",
    aliases: ["begin"],
    guildOnly: false,
    args: true,
    usage: "Enter the command followed by a difficulty level from 1 (easy) to 3 (hard). After that, type \"pve\" or a player's name.",
    cooldown: true,
    cooldowntime: 10,
    execute(message, args) {
        let difficulty = 0
        args.forEach((arg) => {
            if (arg.length == 1) {
                difficulty = parseInt(arg);
            } 
        });
        let player1 = message.author;
        if (message.mentions.user == null) {
            GameController.createGame(player1, null, difficulty);
        } else if (message.mentions.user.size != 1) {
            // error here
        } else {
            console.log(message.mentions.user);
            // GameController.createGame(player1, message.mentions.user.get(1), difficulty);
        }
    },
};