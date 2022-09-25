const { SlashCommandBuilder } = require('discord.js');
const GamePlayer = require('../../schemas/GamePlayer');
const {Types} = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joingameroom')
        .setDescription('Creates a new user in database'),
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

            await interaction.reply({
                content: `You have been added to the database! Have fun playing!`,
                ephemeral: true
            });
        }else {
            await interaction.reply({
                content: `You are already in the database silly. You have played ${player.gamesPlayed} games!`,
                ephemeral: true
            });
        }
    }
}