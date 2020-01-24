module.exports = {
    name: "Start",
    description: "Start the game of NIM.",
    aliases: ["begin"],
    guildOnly: false,
    args: true,
    usage: "Enter the command followed by a difficulty level from 1 (easy) to 3 (hard). After that, type \"pve\" or a player's name.",
    cooldown: true,
	cooldowntime: 10,
    execute(message, args) {
		
    }
};