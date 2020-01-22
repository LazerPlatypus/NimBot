// load in dependencies
const fs = require('fs'); // load filesystem
const Discord = require('discord.js'); // load discord
const config = require('./config.json'); 
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

   // command parsing and stuff here
   // ask adam if you have questions (maybe i can figure out what my old comments meant)
});

