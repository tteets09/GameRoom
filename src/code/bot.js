require('dotenv').config();

const { token } = process.env;
const { Client, Collection } = require('discord.js');
const fs = require('fs');

//{intents: 32767} allows all intents to be used from discord
const client = new Client({intents: 32767});
client.commands = new Collection();
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

client.handleEvents();
client.handleCommands();
client.login(token);