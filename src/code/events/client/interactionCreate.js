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
        }else if(interaction.isSelectMenu()){
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);

            if(!menu) return new Error('There is no code for this select menu!');

            try{
                await menu.execute(interaction, client);
            }catch(err){
                console.error(err);
            }
        }else if(interaction.type == InteractionType.ModalSubmit){
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);

            if(!modal) return new Error('There is no code for this modal!');

            try{
                await modal.execute(interaction, client);
            }catch (err){
                console.error(err);
            }
        }else if(interaction.type == InteractionType.ApplicationCommandAutocomplete){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if(!command) return;

            try{
                await command.autocomplete(interaction, client);
            }catch(err){
                console.error(err);
            }
        }
    }
};