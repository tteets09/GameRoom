const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GameRoom = require('../../schemas/GameRoom');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeroom')
        .setDescription('Close room if the user has one open!'),
    async execute(interaction, client){
        const gameRoom = await GameRoom.findOne({creatorId: interaction.user.id})

        if(!gameRoom){
            const embed = new EmbedBuilder()
                .setTitle('Hm...')
                .setDescription('Seems like you do not have a game open. Why don\'t you try creating one :smile:')
                .setColor('#9bd2fc');

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }else{
            //Deleting the discord channel
            const channel = await client.channels.cache.get(gameRoom.channelId);
            channel.delete();

            //Deleting the GameRoom
            await GameRoom.findOneAndRemove({creatorId: interaction.user.id}).catch(console.error);

            const embed = new EmbedBuilder()
                .setTitle("You are set!")
                .setDescription("You have now closed your GameRoom. Can't wait to play again sometime soon!")
                .setColor('#9bd2fc');

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    }
}