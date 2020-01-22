module.exports = {
    name: "pvpstart",
    description: "Start pvp game with the player who starts it as player1.",
    aliases: 'pvp',
    guildOnly: false,
    args: false,
    usage: null,
    cooldown: false,
    cooldowntime: null,
    execute(message, args) {
        console.log("congratualations you made a command");
        player1 = message.author
        console.log(player1);
    },
};