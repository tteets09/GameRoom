const GameRoom = require('../../schemas/GameRoom');
const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
    data: {
        name: 'gameroom-info'
    },
    async execute(interaction, client){
        const gameroomName = interaction.fields.getTextInputValue(`gameroomName`);
        const gameroomPass = interaction.fields.getTextInputValue(`gameroomPass`);

        //Creating channel
        const gameRoomCategory = '1025956163164049418';

        const channel = await interaction.guild.channels.create({
            name: gameroomName,
            type: ChannelType.GuildText,
            parent: gameRoomCategory,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });

        //Seeing if the user already has a room open
        const filter = {creatorId: interaction.user.id};

        await GameRoom.updateOne(filter,
            {
                $set: {
                    roomName: gameroomName,
                    roomPassword: gameroomPass,
                    channelId: channel.id
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
                    name: 'Game Id:',
                    value: `${gameRoom._id}`
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