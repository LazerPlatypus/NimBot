const gameController = require('../helper_methods/GameController.js');
module.exports = {
    name: "take",
    description: "Take, or \"nim\", the specified number of pipes in the specified heap.",
    aliases: ["nim", "grab"],
    guildOnly: false,
    args: true,
    usage: "Enter the command followed by the number of pipes to take/nim and the heap from which to do so.",
    cooldown: true,
    cooldowntime: 2,
    execute(message, args) {
        console.log("entered take.js");
        let error = '';
        try {
            let pile = parseInt(args[0]);
            try {
                let pipes = parseInt(args[0]);
                console.log("pile and pipes are good. entering takePile")
                error = gameController.takePile(message.author.username, pile, pipes);
            } catch (error) {
                error = 'that is not a valid number for pipes';
            }
        } catch (error) {
            error = 'that is not a valid numer for a pile';
        }
        if (error != "") {
            message.reply(error);
        }
    }
};