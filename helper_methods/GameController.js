const fs = require('fs');
const GameState = require('./GameState.js');
const fileLocation = './data/games.json';
var gameData = new Array;

// 'private' methods
loadData = () => {
    const data = fs.readFileSync(fileLocation);
    gameData = JSON.parse(data).games;
}

saveData = () => {
    for(let player of ["player1", "player2"]) {
        if(gameData[0][player]) {
            let circularVarPath = gameData[0][player].lastMessage;
            if(circularVarPath) {
                if(circularVarPath.channel.messages) circularVarPath.channel.messages = null;
                if(circularVarPath.author) circularVarPath.author = null;
                if(circularVarPath.member) circularVarPath.member = null;
                if(circularVarPath.mentions._client) circularVarPath.mentions._client = null;
                if(circularVarPath.mentions._guild) circularVarPath.mentions._client = null;
            }
        }
    }
    // console.log(gameData[0].player1.lastMessage);
    const json = JSON.stringify(gameData);
    fs.writeFileSync(fileLocation, json, 'utf8');
}

// for a win, the sum of all the pipes have to be zero
// the player whos turn it currently is, wins
// (we check for win at the end of a turn, before shifting players)
checkForWin = (gameState) => {
    let winner = 0;
    let sumOfPipes = gameState.pile1pipes + gameState.pile2pipes + gameState.pile3pipes!=null?gameState.pile3pipes:0 + gameState.pile4pipes!=null?gameState.pile4pipes:0;
    if (sumOfPipes == 1) {
        winner = gameState.whosTurn;
    } else if (sumOfPipes == 0) {
        if (gameState.whosTurn == 1) {
            winner = 2;
        } else {
            winner = 1;
        }
    }
    return winner;
}

// 'public' methods
module.exports = {
    createGame(player1, player2, difficulty) {
        let message = "";
        loadData();
        let allowGame = true;
        gameData.forEach((game) => {
            if (game.player1 == player1 || game.player2 == player1) {
                message = `${player1} already has an active game. finish or cancel the game to make a new one`;
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
    }
};

