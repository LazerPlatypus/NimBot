// load in dependencies
const fs = require('fs'); // load filesystem
const Discord = require('discord.js'); // load discord
const config = require('./config.json');
const prefix = config["prefix"]; 
const token = require('./token.json');

// prep program
const client = new Discord.Client(); // make the client
client.commands = new Discord.Collection(); // make a command collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // grab the commands
const cooldown = new Discord.Collection(); // keeps track of cooldowns


// populate collection with filenames
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

// bot ready / one time run code
client.once('ready', () => {
    console.log('Ready');
})

// command handling (yes, that's spelled right)
client.on('message', async message => { // can't remember why this has to be async. but it causes issues if its not.
    // Place command parsing here.
    // Ask Adam if you have questions. Maybe he can interpret is hold comments.
    
    // Exits the method if the message doesn't start with the prefix or isn't addressed to the bot.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Breaks the message into a command, followed by arguments.
    const args = message.content.slice(prefix.length).split(/ +/);

    // Makes the command name lowercase.
    const commandName = args.shift().toLowerCase();

    // Checks whether the command or alias exists in our collection of commands.
    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    // If the command or alias doesn't exist, exit.
    if (!command) return;

    // Checks whether the command was supplied with arguments.
    if (command.args && !args.length) {

        // If no arguments were supplied, inform the user, relay proper usage, and exit.
        let reply = (`You didn't provide any arguments when they were expected!`);
        if (command.usage) {
            reply += `\nThe proper usage would be ${prefix}${command.name} ${command.usage}`;
        }
        message.reply(reply);
        return;
    }

    // Checks whether the command has a cooldown.
    if (command.cooldown && !cooldowns.has(command.name)) {
        const now = Date.now();
        cooldowns.set(command.name, new Discord.Collection());
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldowntime || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
            // If the cooldown has not ended, inform the user how much longer he must wait.
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                message.reply(`Please wait ${timeLeft.toFixed(1)} more second${timeLeft>1?'s':''} before reusing the ${command.name} command.`);
                return;
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    }



    // Attempts to run the command.
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute your command.')
    }
});

client.login(token.token);