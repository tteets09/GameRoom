const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./src/code/commands`);

        for(const folder of commandFolders){
            const commandFiles=  fs
                .readdirSync(`./src/code/commands/${folder}`)
                .filter(file => file.endsWith(".js"));

            const {commands, commandArray} = client;

            for(const file of commandFiles){
                const command = require(`../../commands/${folder}/${file}`);

                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());

                console.log(`Command: ${command.data.name} has been passed through the handler.`);
            }

            const botId = '1023383096982241342';
            const rest = new REST({ version: '9'}).setToken(process.env.token);

            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(botId), {
                        body: client.commandArray
                    });

                console.log('Successfully reloaded application (/) commands');
            }catch (err){
                console.error(err);
            }
        }
    }
}