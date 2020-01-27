const fs = require('fs');
const config = require('../config.json');
const GameState = require('./GameState.js');
const ai = require('./aigame.js');
const fileLocation = './data/games.json';
var gameData = new Array;

// 'private' methods
loadData = () => {
    const data = fs.readFileSync(fileLocation);
    gameData = JSON.parse(data);
}

saveData = () => {
    const json = JSON.stringify(gameData);
    fs.writeFileSync(fileLocation, json, 'utf8');
}

updateData = (game) => {
    loadData();
    for (let i = 0; i < gameData.length; i++ ) {
        if (gameData[i].gameId == game.gameId) {
            gameData[i] = game;
        }
    }
    saveData();
}

findGameByPlayer = (player) => {
    loadData();
    let playerGame = undefined;
    gameData.forEach((game) => {
        if (game.player1 == player || game.player2 == player) {
            playerGame = game;
        }
    })
    return playerGame;
}

removeGameByPlayer = (player) => {
    let foundGame = false;
    loadData();
    for (let i = 0; i < gameData.length; i++) {
        if (gameData[i].player1 == player || gameData[i].player2 == player) {
            foundGame = true;
            gameData.splice(i, 1);
            break;
        }
    }
    saveData();
    return foundGame;
}

// for a win, the sum of all the pipes have to be zero
// the player whos turn it currently is, wins
// (we check for win at the end of a turn, before shifting players)
checkForWin = (game) => {
    let winner = undefined;
    let sumOfPipes = game.pile1pipes 
                    + game.pile2pipes
                    + game.pile3pipes
                    + game.pile4pipes;
    if (sumOfPipes == 1) {
        winner = game.whosTurn==game.player1?game.player2:game.player1;
    } else if (sumOfPipes == 0) {
        winner = game.whosTurn;
    }
    return winner;
}



// 'public' methods
module.exports = {


    createGame(player1, player2, difficulty) {
        console.log(player2);
        let message = undefined;
        loadData();
        let allowGame = true;
        if (findGameByPlayer(player1)) {
            message = `${player1} already has an active game. finish or cancel the game to make a new one\n`;
            allowGame = false;
        }
        if (player2 != config.botUsername && findGameByPlayer(player2)) {
            message += `${player2} already has an active game. have them finish or cancel the game to make a new one`;
            allowGame = false
        }
        if (allowGame) {
            const gs = new GameState.gameState(player1, player2, difficulty)
            gameData.push(gs);
            saveData();
        }
        return message;
    },


    takePile(player, pile, pipes) {
        let message = undefined;
        let game = findGameByPlayer(player);
        if (game) {
            if (game.whosTurn == player) {
                switch (pile) {
                    case 1:
                        if (game.pile1pipes >= pipes) {
                            game.pile1pipes -= pipes;
                        } else {
                            return "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 2:
                        if (game.pile2pipes >= pipes) {
                            game.pile2pipes -= pipes;
                        } else {
                            return "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 3:
                        if (game.pile3pipes != null && game.pile3pipes >= pipes) {
                            game.pile3pipes -= pipes;
                        } else {
                            return "You can't take that many pipes from that pile.";
                        }
                        break;
                    case 4: 
                        if (game.pile4pipes != null && game.pile4pipes >= pipes) {
                            game.pile4pipes -= pipes;
                        } else {
                            return "You can't take that many pipes from that pile.";
                        }
                        break;
                    default:
                        return `${player} that isn't a valid pile to take from`;
                }
                //swap whos turn it is
                game.whosTurn = game.whosTurn==game.player1?game.player2:game.player1;
            } else {
                return `${player} it is not your turn!`;
            }
        } else {
            return `${player} you do not have a game in progress.`;
        }

        let winner = checkForWin(game);
        if (winner) {
            message = `${winner} wins!`;
            this.endGame(player);
        } else {
            updateData(game);
            if(game.player2 == config.botUsername) {
                game = ai.takeTurn(game);
                winner = checkForWin(game);
                console.log(game);
                if (winner) {
                    message = `${winner} wins!`;
                    this.endGame(player);
                } else {
                    updateData(game);
                }
            }
        }
        return message;
    },


    endGame(player) {
        let message = undefined;
        if (removeGameByPlayer(player)) {
            message = "Game removed";
        } else {
            message = `${player} you do not have an active game.`;
        }
        return message;
    },


    getGameBoard(player) {
        let gameBoard = undefined;
        let game = findGameByPlayer(player);
        if (game) {
            gameBoard = {
                player1: game.player1,
                player2: game.player2,
                row1pipes: game.pile1pipes,
                row2pipes: game.pile2pipes,
                row3pipes: game.pile3pipes,
                row4pipes: game.pile4pipes,
                whosTurn: game.whosTurn
            };
        }
        return gameBoard;
    }
};

