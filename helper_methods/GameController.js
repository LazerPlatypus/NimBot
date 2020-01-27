const fs = require('fs');
const GameState = require('./GameState.js');
const fileLocation = './data/games.json';
var gameData = new Array;

// 'private' methods
loadData = () => {
    const data = fs.readFileSync(fileLocation);
    gameData = JSON.parse(data);
    console.log("loaded game data");
}

saveData = () => {
    // for(let player of ["player1", "player2"]) {
    //     if(gameData[0][player]) {
    //         let circularVarPath = gameData[0][player].lastMessage;
    //         if(circularVarPath) {
    //             if(circularVarPath.channel.messages) circularVarPath.channel.messages = null;
    //             if(circularVarPath.author) circularVarPath.author = null;
    //             if(circularVarPath.member) circularVarPath.member = null;
    //             if(circularVarPath.mentions._client) circularVarPath.mentions._client = null;
    //             if(circularVarPath.mentions._guild) circularVarPath.mentions._client = null;
    //         }
    //     }
    // }
    // console.log(gameData[0].player1.lastMessage);
    const json = JSON.stringify(gameData);
    fs.writeFileSync(fileLocation, json, 'utf8');
}

// for a win, the sum of all the pipes have to be zero
// the player whos turn it currently is, wins
// (we check for win at the end of a turn, before shifting players)
checkForWin = (gameState) => {
    console.log("checking for winner");
    let winner = 0;
    let sumOfPipes = gameState.pile1pipes + gameState.pile2pipes + gameState.pile3pipes != null ? gameState.pile3pipes : 0 + gameState.pile4pipes != null ? gameState.pile4pipes : 0;
    if (sumOfPipes == 1) {
        winner = gameState.whosTurn;
    }
    if (sumOfPipes == 0) {
        winner = gameState.whosTurn == player1 ? player2 : player1;
    }
    console.log(winner);
    return winner;
}

findGameByPlayer = (player) => {
    console.log("inside findGameByPlayer");
    loadData();
    let playerGame = 0;
    gameData.forEach((game) => {
        if (game.player1 == player || game.player2 == player) {
            console.log("found the player");
            console.log(game);
            playerGame = game;
        }
    })
    return playerGame;
}

saveGame = (game) => {
    console.log("in saveGame");
    loadData();
    console.log(game);
    console.log(gameData);
    for (let i = 0; i < gameData.length; i++) {
        if (gameData[i].gameId == game.gameId) {
            console.log("found the game")
            gameData[i] = game;
        }
    }
    console.log(gameData);
    saveData();
}

// 'public' methods
module.exports = {
    createGame(player1, player2, difficulty) {
        let message = "";
        loadData();
        let allowGame = true;
        gameData.forEach((game) => {
            if (game.player1 == player1 || game.player2 == player1) {
                message = `${player1} already has an active game. finish or cancel the game to make a new one\n`;
                allowGame = false;
            }
            if (player2 != null && (game.player1 == player2 || game.player2 == player2)) {
                message += `${player2} already has an active game. have them finish or cancel the game to make a new one`;
                allowGame = false
            }
        })
        if (allowGame) {
            const gs = new GameState.gameState(player1, player2, difficulty)
            gameData.push(gs);
            saveData();
        }
        return message;
    },

    // deleteGame(player1, player2) {
    //     for(let i = 0; i < gameData.length; i++) {
    //         let game = gameData[i];
    //         if((player1.id == game.player1.id || player1.id == game.player2.id)
    //             && (!player2 || player2.id == game.player2.id || player2.id == game.player1.id)
    //         ) {
    //             gameData.splice(i, 1);

    //             break;
    //         }
    //     }
    takePile(player, pile, pipes) {
        let message = "";
        console.log("inside takePile");
        let game = findGameByPlayer(player);
        console.log(game);
        if (game != 0) {
            console.log("found the game");
            if (GameState.whosTurn == player) {
                switch (pile) {
                    case 1:
                        console.log("found the pile");
                        if (game.pile1pipes >= pipes) {
                            console.log("subtracting the pipes");
                            game.pile1pipes -= pipes;
                        } else {
                            message = "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 2:
                        if (game.pile2pipes >= pipes) {
                            game.pile2pipes -= pipes;
                        } else {
                            message = "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 3:
                        if (game.pile3pipes != null && game.pile3pipes >= pipes) {
                            game.pile3pipes -= pipes;
                        } else {
                            message = "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 4:
                        if (game.pile4pipes != null && game.pile4pipes >= pipes) {
                            game.pile4pipes -= pipes;
                        } else {
                            message = "You can't take that many pipes from that pile.";
                        }
                        break;
                    default:
                        message = `${player} that isn't a valid pile to take from`;
                }
            } else {
                message = `${player} it is not your turn`
            }
        } else {
            message = `${player} you do not have a game in progress.`;
        }

        console.log(message);

        console.log("checking for winner");
        let winner = checkForWin(game);
        console.log(winner);
        if (winner != 0) {

            message = `${winner} wins!`;
            this.endGame(player);
        }

        saveGame();

        return message;
    },
    endGame(player) {
        let game = findGameByPlayer(player);
        let message = '';
        if (game != 0) {
            let indexOfGame = gameData.findIndex(game);
            if (indexOfGame != -1) {
                gameData = gameData.splice(indexOfGame);
            } else {
                message = `${player} there was an error removing your game from the data file.`;
            }
        } else {
            message = `${player} you do not have an active game.`;
        }
        return message;
    }
};