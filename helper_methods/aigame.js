const gc = require('.\\GameController.js');
module.exports = {
    takeTurn(game){
        if(game.difficulty == 1){
            var randomRow = Math.floor(Math.random(2) * 10);
            if(randomRow == 1 && game.amountofsticksinrow1 > 0){
                var takeAmount = Math.floor(Math.random(game.pile1pipes) * 10);
                game.pile1pipes -= takeAmount;
            }
            else if(randomRow == 2 && game.amountofsticksinrow2 > 0 ||
                game.pile1pipes == 0 && game.amountofsticksinrow2 > 0){
                var takeAmount = Math.floor(Math.random(game.pile2pipes) * 10);
                game.pile2pipes -= takeAmount;
            }
        }
        else if(game.difficulty == 2){
            var randomRow = Math.floor(Math.random(3) * 10);
            if(randomRow == 1 && game.pile1pipes > 0){
                var takeAmount = Math.floor(Math.random(game.pile1pipes) * 10);
                game.pile1pipes =- takeAmount;
            }
            else if(randomRow == 2 && game.pile2pipes > 0 ||
                game.pile1pipes == 0 && game.pile2pipes > 0){
                var takeAmount = Math.floor(Math.random(game.pile2pipes) * 10);
                game.pile2pipes =- takeAmount;
            }
            else if(randomRow == 3 && game.pile3pipes > 0 ||
                (game.pile1pipes == 0 && game.pile3pipes > 0 &&
                game.pile2pipes == 0 && game.pile3pipes > 0)){
                var takeAmount = Math.floor(Math.random(game.pile3pipes) * 10);
                game.pile3pipes =- takeAmount;
            }
            
        }
        else if(game.difficulty == 3){
            var randomRow = Math.floor(Math.random(3) * 10);
            if(randomRow == 1 && game.amountofsticksinrow1 > 0){
                var takeAmount = Math.floor(Math.random(game.pile1pipes) * 10);
                game.pile1pipes =- takeAmount;
            }
            else if(randomRow == 2 && game.game.pile2pipes > 0 ||
                game.pile1pipes == 0 && game.pile2pipes > 0){
                var takeAmount = Math.floor(Math.random(game.pile2pipes) * 10);
                game.pile2pipes =- takeAmount;
            }
            else if(randomRow == 3 && game.amountofsticksinrow2 > 0 ||
                game.pile1pipes == 0 && game.pile2pipes > 0 ||
                game.pile2pipes == 0 && game.pile3pipes > 0){
                var takeAmount = Math.floor(Math.random(game.pile3pipes) * 10);
                game.pile3pipes =- takeAmount;
            }
            else if(randomRow == 4 && game.pile4pipes > 0 ||
                (game.pile1pipes == 0 && game.pile4pipes > 0 &&
                game.pile2pipes == 0 && game.pile4pipes > 0 &&
                game.pile3pipes == 0 && game.pile4pipes > 0)){
{
                var takeAmount = Math.floor(Math.random(game.pile4pipes) * 10);
                game.pile4pipes =- takeAmount;
            }
        }




        //here we would do something that ould make a new game state but remove the 'amount of sticks from the selected row.
        //but before we do that we also need to check how many sticks there are in the row to accoun for bad and incorrect input
        //after we make a new gamestate we just need the AI (computer) to remove some sticks and make a new game state
        //we can store game states in an array list in memory
        //FINALLY, we will display the game state to the screen in the discord text chat with a ping(or not) and then the player can take their turn again
        gamestate1 = st.gameState
    }
}
}

