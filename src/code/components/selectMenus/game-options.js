const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder} = require('discord.js');
const GameRoom = require('../../schemas/GameRoom');
const { Types } = require('mongoose');

module.exports = {
    data: {
        name: `game-options`
    },
    async execute(interaction, client){
        const userChoice = interaction.values[0];

        // Create new GameRoom and store userChoice as game type
        // The document will be updated with room name and password
        // After it is gotten from the user
        const gameRoom = await GameRoom.findOne({creatorId: interaction.user.id});

        // If the user does not already have a GameRoom open the start the process
        // of making one.
        if(!gameRoom) {
            const gameRoom = await new GameRoom({
                _id: Types.ObjectId(),
                gameType: userChoice,
                creatorId: interaction.user.id
            });

            gameRoom.save().catch(console.error);

            const gameroomInfo = new ModalBuilder()
                .setCustomId(`gameroom-info`)
                .setTitle("Game Room Information");

            const gameroomName = new TextInputBuilder()
                .setCustomId(`gameroomName`)
                .setLabel('GameRoom Name:')
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const gameroomPass = new TextInputBuilder()
                .setCustomId('gameroomPass')
                .setLabel("GameRoom Password")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const row1 = new ActionRowBuilder().addComponents(gameroomName);
            const row2 = new ActionRowBuilder().addComponents(gameroomPass);

            gameroomInfo.addComponents(row1, row2);

            await interaction.showModal(gameroomInfo);
        }
    }
}