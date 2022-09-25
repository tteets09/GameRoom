const { token } = process.env;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        //Get the folders in the ./src/commands folder
        const commandFolders = fs.readdirSync(`./src/commands`);

        //Loop through the folders in ./src/commands
        for(const folder of commandFolders){
            //Getting every file in .src/commands/${folder} that ends with .js
            const commandFile = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            //Getting commands and commandArray from the client object
            const { commands, commandArray } = client;

            //Looping through all files found that end with .js
            for(const file of commandFile){
                //Getting the specific command
                const command = require(`../../commands/${folder}/${file}`);

                //Adding the command to the commands the bot has
                commands.set(command.data.name, command);
                //Adding the command to the commandArray
                commandArray.push(command.data.toJSON);

                console.log(chalk.green(`Loaded: ${folder}/${command.data.name}`));
            }

            const clientId = '977352202991587418';
            const rest = new REST({ version: '9'}).setToken(token);

            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    });

                console.log('Successfully reloaded application (/) commands');
            }catch (err){
                console.error(err);
            }

        }

    }

}