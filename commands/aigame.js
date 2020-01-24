module.exports = {
    name: 'takesticks',
    description: 'Take a stick from a row in the game;',
    guildOnly: false,
    args: true,
    cooldown: false,
    execute(message, args) {
        const Discord = require('discord.js');
        const st = require('..\\helper_methods\\GameState.js');
        var row = args[0];
        var amount = args[1];
        //here we would do something that ould make a new game state but remove the 'amount of sticks from the selected row.
        //but before we do that we also need to check how many sticks there are in the row to accoun for bad and incorrect input
        //after we make a new gamestate we just need the AI (computer) to remove some sticks and make a new game state
        //we can store game states in an array list in memory
        //FINALLY, we will display the game state to the screen in the discord text chat with a ping(or not) and then the player can take their turn again
    }
};

