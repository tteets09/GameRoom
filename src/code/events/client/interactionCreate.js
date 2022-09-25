const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            //If there is no command return
            if(!command) return;

            try{
                //Runs the command
                await command.execute(interaction, client);
            }catch (err){
                console.error(err);
                await interaction.reply({
                    content: 'Something went wrong while executing this command...',
                    ephemeral: true
                });
            }
        }
    }
};