const fs = require('fs'); // loads filesystem
const Discord = require('discord.js'); // loads discord.js
const { prefix, token } = require('./config.json'); // loads our config file

const client = new Discord.Client(); // makes the client
client.commands = new Discord.Collection(); // makes a collection for our commands to go in
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name
const cooldowns = new Discord.Collection();
var guildConf = require('./prefixes.json');



// populates the collection of commands using the filenames
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// tells us the bot is ready
client.once('ready', () => {
    console.log('Ready');
})

// dynamic command handleing
client.on('message', async message => {

    //define prefix
    //make sure user is authorzied to use the command
    //have user input prefix by !prefix {userselectedmessage}

    // exits the method if the message doesn't start with the prefix 
    // i.e.: the message isn't addressed to the bot
    // prefix undefined when the prefix changing code is below this line, undefined when it is above
    if (!message.content.startsWith(prefix) || message.author.bot) return;



    // breaks the message into a command, followed by arguments
    const args = message.content.slice(prefix.length).split(/ +/);

    // makes the command name lowercase
    const commandName = args.shift().toLowerCase();

    // exits the method if the command or its aliases doesn't exist in our collection of commands
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;


    // checks if the command can only be used in a server
    if (command.guildOnly && message.channel.type !== 'text') {
        message.reply('I can\'t execute that command inside DMs');
        return;
    }

    // checks if the commands needs arguments
    if (command.args && !args.length) {
        let reply = (`You didn't provide any arguments when they were expected expected!`);
        if (command.usage) {
            reply += `\nThe proper usage would be ${prefix}${command.name} ${command.usage}`;
        }
        message.reply(reply);
        return;
    }

    // checks if the command has a cooldown
    if (command.cooldown && !cooldowns.has(command.name)) {
        const now = Date.now();
        cooldowns.set(command.name, new Discord.Collection());
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldowntime || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                message.reply(`please wait ${timeLeft.toFixed(1)} more second${timeLeft>1?'s':''} before reusing the ${command.name} command.`);
                return;
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    }



    // attempts to run the command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute your command')
    }



});

// check out the 'commands' folder to see how I ported this command over there.

client.login(token);