const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, EmbedBuilder} = require('discord.js');
const GameRoom = require('../../schemas/GameRoom');
const Player = require('../../schemas/GamePlayer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createroom')
        .setDescription('Creates a GameRooms and returns the information for the other person to join.'),
    async execute(interaction, client){
        const EMBED_COLOR = '#9bd2fc';

        if(interaction.guild == null){
            const embed= new EmbedBuilder()
                .setTitle('Uhoh!')
                .setDescription('You are not allowed to use that here!')
                .setColor(EMBED_COLOR);

            interaction.reply({
                embeds: [embed]
            });
            return;
        }

        //Seeing if the person is registered in the database already
        const player = await Player.findOne({discordId: interaction.user.id});

        if(!player){
            const embed = new EmbedBuilder()
                .setTitle('Uhoh!')
                .setDescription('It seems you have not ran the `/joingameroom` command yet. Please run this command so you are a registered player and you can have fun!!!')
                .setColor(EMBED_COLOR)

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })

            return;
        }

        const gameRoom = await GameRoom.findOne({creatorId: interaction.user.id});

        if(gameRoom) {
            const embed = new EmbedBuilder()
                .setTitle("Uhoh!")
                .setDescription("It seems you already have a GameRoom open! Please close the one you have open if you want to start a new one. Here is the information to the one you already have open:")
                .setColor(EMBED_COLOR)
                .setFields([
                    {
                        name: 'Game ID:',
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

            return;
        }

        /**TODO: REIMPLEMENT CREATE GAME COMMAND*/
    }
}