const gameController = require('../helper_methods/GameController.js');


const repeator = i => f => {
    if (i > 0) {
      f()
      repeator (i - 1) (f)
    }
  }
module.exports = {
    name: "show",
    description: "Take, or \"nim\", the specified number of pipes in the specified heap.",
    aliases: ["display"],
    guildOnly: false,
    args: false,
    usage: "Enter the command to see the current state of the board",
    cooldown: false,
    cooldowntime: 0,
    execute(message, args) {
        let response = undefined;
        let gameBoard = gameController.getGameBoard(message.author.username);
        if (gameBoard) {
           row1display = '';
           row2display = '';
           row3display = '';
           row4display = '';    
           repeator (gameBoard.row1pipes) (() => row1display += ':carrot: ');
           repeator (gameBoard.row2pipes) (() => row2display += ':carrot: ');
           if (gameBoard.row3pipes) repeator (gameBoard.row3pipes) (() => row3display += ':carrot: ');
           if (gameBoard.row4pipes) repeator (gameBoard.row4pipes) (() => row4display += ':carrot: ')
            response = `${gameBoard.player1} vs ${gameBoard.player2},\n${row1display}\n${row2display}\n${row3display}\n${row4display}\nit is ${gameBoard.whosTurn}'s turn`;
        }
        if (response) {
            message.reply(response);
        } else {
            message.replay("you don't have an active game");
        }
    }
};