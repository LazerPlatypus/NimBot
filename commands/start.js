const GameController = require('../helper_methods/GameController.js');
module.exports = {
    name: "start",
    description: "Start the game of NIM.",
    aliases: ["begin"],
    guildOnly: false,
    args: true,
    usage: "Enter the command followed by a difficulty level from 1 (easy) to 3 (hard). If you want to play against someone instead of the A.I., mention a player's name.",
    cooldown: true,
    cooldowntime: 10,
    execute(message, args) {
        let difficulty = 0
        let diffIsValid = false;
        
        if (args[0]) {
            try {
                difficulty = parseInt(args[0]);
                if(difficulty && difficulty >= 1 && difficulty <= 3) diffIsValid = true;
            } catch(err) {}
        }

        if(diffIsValid) {
            let player1 = message.author;
            if (!message.mentions.user) {
                GameController.createGame(player1, null, difficulty);
            } else if (message.mentions.user.size > 1) {
                message.reply("you may only play against one other person or the A.I.");
            } else {
                console.log(message.mentions.user);
                GameController.createGame(player1, message.mentions.user.get(1), difficulty);
            }
        } else {
            message.reply("the first parameter of \"start\" must be a number from 1 to 3.");
        }
        
    },
};