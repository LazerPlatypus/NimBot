const config = require('../config.json');
const GameController = require('../helper_methods/GameController.js');
const games = require('../data/games.json');
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
        let difficulty = 0
        let diffIsValid = false;
        let error = '';
        if (args[0]) {
            try {
                difficulty = parseInt(args[0]);
                if(difficulty && difficulty >= 1 && difficulty <= 3) diffIsValid = true;
            } catch(err) {
                error = 'That is not a valid difficulty';
            }
        }

        if(diffIsValid) {
            let player1 = message.author.username;
            let isInGame = false;
            for(let game of games) {
                // console.log(games);
                if(message.author.id == game.player1.id || message.author.id == game.player2.id) {
                    isInGame = true;
                    break;
                }
            }
            if(isInGame) {
                message.reply("you're already in a game. You must end it if you want to begin a new one.")
            }
            else if(!message.mentions.user) {
                error = GameController.createGame(player1, config.botUsername, difficulty);
            } else if(message.mentions.user.size > 1) {
                message.reply("you may only play against one other person or the A.I.");
            } else {
                console.log(message.mentions.user);
                error = GameController.createGame(player1, message.mentions.user.get(1), difficulty);

            }
        }
        
        if (error != '') {
            message.reply(error);
        }
    },
};