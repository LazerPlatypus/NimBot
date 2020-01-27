const config = require('../config.json');
const GameController = require('../helper_methods/GameController.js');
module.exports = {
    name: "start",
    description: "Start the game of NIM.",
    aliases: ["begin"],
    guildOnly: false,
    args: true,
    usage: "start {difficulty, 1-3} {mention who you want to play}\nTo play against NimBot type start {1-3} @NimBot",
    cooldown: true,
    cooldowntime: 10,
    execute(message, args) {
        let error = undefined;
        let validDifficulty = false;

        // validate difficulty
        let difficulty = parseInt(args[0]);
        if (difficulty > 0 && difficulty < 4) {
            validDifficulty = true;
        } else {
            error = 'That is not a valid difficulty';
        }

        // validate users
        let player1 = message.author.username;
        // this one line of code gave me pancreatic cancer
        let player2 = message.mentions.users.size>0?message.mentions.users.array()[0].username:config.botUsername;
        // create the game
        if (validDifficulty && player1 && player2) {
            error = GameController.createGame(player1, player2, difficulty);
        }

        // reply with errors or messages
        if (error) {
            message.reply(error);
        } else {
            message.reply("Game created");
        }
    },
};