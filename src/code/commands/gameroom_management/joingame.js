const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const Player = require('../../schemas/GamePlayer');
const GameRoom = require('../../schemas/GameRoom');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joingame')
        .setDescription('Allows the user to join a game!')
        .addStringOption((option) =>
            option
                .setName("gameid")
                .setDescription('The game id that allows the user to join.')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction, client){
        const focusedValue = interaction.options.getFocused();
        const choices = [];
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );

        await interaction.respond(
            filtered.map((choice) => ({name: choice, value: choice}))
        );
    },
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
        const gameId = interaction.options.getString("gameid");

        //Checking if the player exists
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

        //Empty catch to make sure continues
        const gameRoom = await GameRoom.findOne({_id: gameId}).catch((err) => {});

        //If someone enters a gameid to a GameRoom that does not exist
        if(!gameRoom){
            const embed = new EmbedBuilder()
                .setTitle("Uhoh!")
                .setDescription("Seems like you have entered a game id to a GameRoom that does not exist. Please try again.")
                .setColor(EMBED_COLOR)

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

            return;
        }

        if(gameRoom.joinedId != null){
            const embed = new EmbedBuilder()
                .setTitle("Uhoh")
                .setDescription("Seems like this room id has already been used. Please make sure you have the id correct.")
                .setColor(EMBED_COLOR);

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

            return;
        }

        //Adding the user to the database document
        await GameRoom.updateOne({_id: gameId}, {
            $set: {
                joinedId: interaction.user.id
            }
        });

        //Add user to channel
        const channel = client.channels.cache.get(gameRoom.channelId);
        await channel.permissionOverwrites.edit(interaction.user.id, {ViewChannel: true});

        const gameType = gameRoom.gameType;
        let gameTitle;
        switch(gameType){
            case "rockpaperscissors":
                gameTitle = "Rock Paper Scissors";
                break;
            case "battledome":
                gameTitle = "Battle Dome";
                break;
            case "tictactoe":
                gameTitle = "Tic Tac Toe";
                break;
        }

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Welcome!')
            .setDescription(`Welcome to GameRoom. You are playing ${gameTitle}. To start the game run /play.`)
            .setColor(EMBED_COLOR);

        //Stating who joined the game
        const joinEmbed = new EmbedBuilder()
            .setDescription(`Welcome ${interaction.user.toString()} to the GameRoom.`)
            .setColor(EMBED_COLOR);

        channel.send({
            embeds: [welcomeEmbed, joinEmbed]
        })
    }
}