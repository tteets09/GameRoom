const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, EmbedBuilder} = require('discord.js');
const GameRoom = require('../../schemas/GameRoom');
const Player = require('../../schemas/GamePlayer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createroom')
        .setDescription('Creates a game room and returns the webpage to access.'),
    async execute(interaction, client){
        //Seeing if the person is registered in the database already
        const player = await Player.findOne({discordId: interaction.user.id});

        if(!player){
            const embed = new EmbedBuilder()
                .setTitle('Uhoh!')
                .setDescription('It seems you have not ran the `/joingameroom` command yet. Please run this command so you are a registered player and you can have fun!!!')
                .setColor('#9bd2fc')

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
                .setColor('#9bd2fc')
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

        const menu = new SelectMenuBuilder()
            .setCustomId(`game-options`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new SelectMenuOptionBuilder({
                    label: 'Game #1',
                    value: 'Game1'
                }),
                new SelectMenuOptionBuilder({
                    label: 'Game #2',
                    value: 'Game2',
                }),
                new SelectMenuOptionBuilder({
                    label: 'Game #3',
                    value: 'Game3'
                })
            )

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
            ephemeral: true
        });
    }
}