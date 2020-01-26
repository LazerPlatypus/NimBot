module.exports = {
    name: "help",
    description: "Receive a D.M. with instructions on the game of Nim.",
    aliases: ["info", "?"],
    guildOnly: false,
    args: false,
    usage: "Enter the command without arguments.",
    cooldown: true,
    cooldowntime: 10,
    execute(message, args) {
        const fs = require("fs");
        const Discord = require("discord.js");
        const { prefix } = require("../config.json");
        const st = require("..\\helper_methods\\send-text.js");
        
        if(message.channel.type === "dm") {
            // get the commands loaded in a collection
            commands = new Discord.Collection(); // makes a collection for our commands to go in
            const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); // gets our commands by their names
            commandFiles.sort();
    
            // prepare the message
            st.clearMessage();
            st.setTitle(`Nim Discord Bot\nThe current prefix is: ${prefix}`);
            st.setAuthor(`Daniil Baydak, Riley Byrd, Adam Holt, Searjasub Lopez, and Zane Slocum with examples taken from a project by Daniil Baydak, Robert Dragoo, Adam Holt, Nash Molstad, and Jacob Vella.`);
    
            // for each command, add all the info the text sender.
            for (i = 0; i < commandFiles.length; i++) {
                let command = require(`../commands/${commandFiles[i]}`);
                st.addText(`_\n**${command.name}**\nDescription: ${command.description}
                Other names: ${(command.aliases && command.aliases.length>0 && Array.isArray(command.aliases))?command.aliases.join(", "):"none"}
                usage: ${command.usage==undefined?"none specified":command.usage}
                Only usable in text-server: ${command.guildOnly}
                Uses arguments: ${command.args}
                Has a cooldown: ${command.cooldown + (command.cooldown?"\nCooldown time: "+command.cooldowntime:"")}\n\n`)
            }
    
            // send the message.
            st.sendMessage(message.channel);
        } else {
            let reply = "you may only issue the help command in a D.M.";
            message.reply(reply);
        }
    }
};