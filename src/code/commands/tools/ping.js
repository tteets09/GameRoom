const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns my ping!'),
    async execute(interaction, client){
        //Defers the reply until it gets the answer it needs
        const message = await interaction.deferReply({
            fetchReply: true
        });

        //Gets the answer needed
        const newMessage =  `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;

        //Sends the new message
        await interaction.editReply({
            content: newMessage
        });
    }
}