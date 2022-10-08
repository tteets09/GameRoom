require('dotenv').config();

const { token, database } = process.env;
const { connect } = require('mongoose');
const { Client, Collection } = require('discord.js');
const fs = require('fs');

//{intents: 32767} allows all intents to be used from discord
const client = new Client({intents: 32767});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolder = fs.readdirSync(`./src/code/functions`);

//Looping through the folders in the ./src/functions folder.
for(const folder of functionFolder){
    //Getting every file in the folder that ends with .js
    const functionFiles = fs
        .readdirSync(`./src/code/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    //For every file require it.
    for(const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

//Executing the handlers
client.handleEvents();
client.handleComponents();
client.handleCommands();

//Logging into the discord bot
client.login(token);

//connecting to the database
(async () => {
    await connect(database).catch(console.error);
})();