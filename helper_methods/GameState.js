// easy - 3, 3
// medium - 2, 5, 7
// hard - 2, 3, 8, 9

class GameState  {
    constructor(player1, player2, difficulty) {
        this.player1 = player1;
        if (player2 != null) {
            this.player2 = player2;
            isPvp = true;
        }
        this.whosTurn = player1;
        this.difficulty = difficulty;
        switch(difficulty) {
            case 1: 
                this.pile1pipes = 3;
                this.pile2pipes = 3;
                break;
            case 2: 
                this.pile1pipes = 2;
                this.pile2pipes = 5;
                this.pile3pipes = 7;
                break;
            case 3:
                this.pile1pipes = 2;
                this.pile2pipes = 3;
                this.pile3pipes = 8;
                this.pile4pipes = 9;
                break;
            default: 
                this.pile1pipes = 3;
                this.pile2pipes = 3;
        }
    }
    isPvp = false; // true or false
    player1 = null; // player 1 username
    player2 = null; // player 2 username or null if computer
    whosTurn = null; // 1 for player 1, 2 for player 2 or computer
    difficulty = null; // 1, 2 or 3 for easy, medium, hard respectivly
    pile1pipes = null; // number of pipes in pile 1
    pile2pipes = null; // numer of pipes in pile 2
    pile3pipes = null; // number of pipes in pile 3, or null if easy
    pile4pipes = null; // number of pipes in pile 4, or null if easy or medium
    gameOver = false; // true or false

}
module.exports = {
  gameState: GameState


};