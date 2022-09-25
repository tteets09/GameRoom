const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns my ping!'),
    async execute(interaction, client){
        //Defers the reply until it gets the information needed to reply
        const message = await interaction.deferReply({
            fetchReply: true
        });

        //Gets the information for the new message
        const newMessage = `API Latency: ${client.ws.ping}
            \nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;


        //Send the new message that was generated
        await interaction.editReply({
            content: newMessage
        });
    }
}