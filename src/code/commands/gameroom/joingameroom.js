const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GamePlayer = require('../../schemas/GamePlayer');
const {Types} = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joingameroom')
        .setDescription('Registers the player in the database as a GameRoom player.'),
    async execute(interaction, client){
        let player = await GamePlayer.findOne({discordId: interaction.user.id});
        const commandExecutor = interaction.user;

        //If the player does not already exist...
        if(!player){
            //Create a new player for the database
            player = await new GamePlayer({
                _id: Types.ObjectId(),
                discordId: commandExecutor.id,
                gamesPlayed: 0
            });

            //try and save the new player in the database
            player.save().catch(console.error);

            //Create an embed
            const createdUserEmbed = new EmbedBuilder()
                .setTitle("Welcome! Have Fun")
                .setDescription(`${commandExecutor.tag} you have been added to the database! You are ready to play!`)
                .setColor("#9bd2fc")

            interaction.reply({
                embeds: [createdUserEmbed],
                ephemeral: true
            });
        }else {
            const alreadyExistEmbed = new EmbedBuilder()
                .setTitle("You are already registered silly!")
                .setDescription("It seems you are already in the database! Thank you for playing!")
                .setColor("#9bd2fc")
                .addFields([
                    {
                        name: "Games Played:",
                        value: `${player.gamesPlayed}`
                    }
                ])

            interaction.reply({
                embeds: [alreadyExistEmbed],
                ephemeral: true
            });
        }
    }
}