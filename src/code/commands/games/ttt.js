const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const Player = require('../../schemas/GamePlayer');
const TicTacToe = require("discord-tictactoe");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ttt')
        .setDescription('Creates a game of Tic Tac Toe!')
        .addUserOption(option =>
            option
                .setName('opponent')
                .setDescription('Player being played against.a')
                .setRequired(true)
        ),
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

        const game = new TicTacToe({language: 'en'});

        await game.handleInteraction(interaction);

        game.on('win', async data => {
            const winnerId = data.winner.user.id;
            const loserId = data.loser.user.id;

            // Updating winners information in database
            await Player.updateOne(
                {discordId: winnerId},
                {
                    $set: {
                        gamesPlayed: (this.gamesPlayed) ? this.gamesPlayed++ : 1,
                        gamesWon: (this.gamesWon) ? this.gamesWon++ : 1
                    }
                }
            )

            await Player.updateOne(
                {discordId: loserId},
                {
                    $set: {
                        gamesPlayed: (this.gamesPlayed) ? this.gamesPlayed++ : 1,
                        gamesLost: (this.gamesLost) ? this.gamesLost++ : 1
                    }
                }
            )
        })
    }
}