const GameRoom = require("../../schemas/GameRoom");
const { Types } = require("mongoose");
const {EmbedBuilder, PermissionsBitField, ChannelType} = require("discord.js");

module.exports = {
    data: {
        name: `roomName`
    },
    async execute(interaction, client){


        const gameRoomName = interaction.fields.getTextInputValue("gameRoomName");
        const gameRoomPass = interaction.fields.getTextInputValue("gameRoomPass");

        let channel;
        try{
            channel = await interaction.guild.channels.create({
                name: gameRoomName,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            await channel.setParent('1025956163164049418', {lockPermissions: false});
        }catch(error){

            console.log(error);

            const errorEmbed = new EmbedBuilder()
                .setTitle("Uhoh!")
                .setDescription("It seems there has been an error");
            await interaction.reply({
                embeds: [errorEmbed]
            });
            return;
        }

        let newGameRoom = await new GameRoom({
            _id: Types.ObjectId(),
            roomName: gameRoomName,
            roomPassword: gameRoomPass,
            channelId: channel.id,
            creatorId: interaction.user.id
        })

        newGameRoom.save().catch(console.error);

        const embed = new EmbedBuilder()
            .setTitle("GameRoom Created!")
            .setDescription("You have successfully created your gameroom. Send the GameRoom id and password to a friend and have them run `/joingame {gameId}` with the gameId where `{gameId}` is!")
            .setColor("#9bd2fc")
            .addFields([
                {
                    name: "GameRoom ID:",
                    value: `${newGameRoom._id}`
                },
                {
                    name: "GameRoom Password:",
                    value: `${gameRoomPass}`
                }
            ])

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}