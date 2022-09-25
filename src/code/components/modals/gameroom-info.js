const GameRoom = require('../../schemas/GameRoom');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: 'gameroom-info'
    },
    async execute(interaction, client){
        const gameroomName = interaction.fields.getTextInputValue(`gameroomName`);
        const gameroomPass = interaction.fields.getTextInputValue(`gameroomPass`);

        //Seeing if the user already has a room open
        const filter = {creatorId: interaction.user.id};

        await GameRoom.updateOne(filter,
            {
                $set: {
                    roomName: gameroomName,
                    roomPassword: gameroomPass
                }
            }
        ).catch(console.error);

        const gameRoom = await GameRoom.findOne({creatorId: interaction.user.id});

        const embed = new EmbedBuilder()
            .setTitle("You are set!")
            .setDescription("You have created a new game room! Your information so your friend can join is below! Enjoy!!!")
            .setColor('#9bd2fc')
            .setFields([
                {
                    name: 'Website:',
                    value: `localhost:3000/join/${gameRoom._id}`
                },
                {
                    name: 'Password:',
                    value: `${gameRoom.roomPassword}`
                }
            ]);

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}