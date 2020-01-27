getRandom = (max) => {
    return Math.ceil(Math.random() * max);
}
module.exports = {
    takeTurn(game){
        if(game.difficulty == 1){
            var randomRow = getRandom(2);
            if(randomRow == 1 && game.pile1pipes > 0 || 
                game.pile2pipes == 0 && game.pile1pipes > 0){
                    if(game.pile1pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile1pipes -= getRandom(game.pile1pipes - mod);
            }
            else if(randomRow == 2 && game.pile2pipes > 0 ||
                game.pile1pipes == 0 && game.pile2pipes > 0){
                    if(game.pile2pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile2pipes -= getRandom(game.pile2pipes - mod);
            }
        }
        else if(game.difficulty == 2){
            var randomRow = getRandom(3);
            if(randomRow == 1 && game.pile1pipes > 0 || 
                game.pile2pipes == 0 && game.pile1pipes > 0 && 
                game.pile3pipes == 0 && game.pile1pipes > 0){
                    if(game.pile1pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile1pipes =- getRandom(game.pile1pipes - mod);
            }
            else if(randomRow == 2 && game.pile2pipes > 0 ||
                game.pile1pipes == 0 && game.pile2pipes > 0 && 
                game.pile3pipes == 0 && game.pile2pipes > 0){
                    if(game.pile2pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile2pipes =- getRandom(game.pile2pipes - mod);
            }
            else if(randomRow == 3 && game.pile3pipes > 0 ||
                (game.pile1pipes == 0 && game.pile3pipes > 0 &&
                game.pile2pipes == 0 && game.pile3pipes > 0)){
                    if(game.pile3pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile3pipes =- getRandom(game.pile3pipes - mod);
            }
            
        }
        else if(game.difficulty == 3){
            var randomRow = getRandom(4);
            if(randomRow == 1 && game.pile1pipes > 0 || 
                (game.pile4pipes == 0 && game.pile1pipes > 0 &&
                game.pile2pipes == 0 && game.pile1pipes > 0 &&
                game.pile3pipes == 0 && game.pile1pipes > 0)){
                    if(game.pile1pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile1pipes =- getRandom(game.pile1pipes - mod);
            }
            else if(randomRow == 2 && game.game.pile2pipes > 0 ||
                (game.pile1pipes == 0 && game.pile2pipes > 0 &&
                game.pile4pipes == 0 && game.pile2pipes > 0 &&
                game.pile3pipes == 0 && game.pile2pipes > 0)){
                    if(game.pile2pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile2pipes =- getRandom(game.pile2pipes - mod);
            }
            else if(randomRow == 3 && game.pile2pipes > 0 ||
                (game.pile1pipes == 0 && game.pile3pipes > 0 &&
                    game.pile2pipes == 0 && game.pile3pipes > 0 &&
                    game.pile4pipes == 0 && game.pile3pipes > 0)){
                        if(game.pile3pipes > 1){
                            mod = 1
                        }
                        else{
                            mod = 0
                        }
                game.pile3pipes =- getRandom(game.pile3pipes - mod);
            }
            else if(randomRow == 4 && game.pile4pipes > 0 ||
                (game.pile1pipes == 0 && game.pile4pipes > 0 &&
                game.pile2pipes == 0 && game.pile4pipes > 0 &&
                game.pile3pipes == 0 && game.pile4pipes > 0)) {
                    if(game.pile4pipes > 1){
                        mod = 1
                    }
                    else{
                        mod = 0
                    }
                game.pile4pipes =- getRandom(game.pile4pipes - mod);
            }
        }

        game.whosTurn = game.player1;


        //here we would do something that ould make a new game state but remove the 'amount of sticks from the selected row.
        //but before we do that we also need to check how many sticks there are in the row to accoun for bad and incorrect input
        //after we make a new gamestate we just need the AI (computer) to remove some sticks and make a new game state
        //we can store game states in an array list in memory
        //FINALLY, we will display the game state to the screen in the discord text chat with a ping(or not) and then the player can take their turn again
        return game;
    }
}

