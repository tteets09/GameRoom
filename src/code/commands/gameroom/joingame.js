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
                .setAutocomplete(false)
                .setRequired(true)
        ).addStringOption(option =>
            option
                .setName("gamepassword")
                .setDescription("The game password to join the GameRoom")
                .setAutocomplete(false)
                .setRequired(true)),
    async autocomplete(interaction, client){
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
        const gamePass= interaction.options.getString("gamepassword")

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

        if(gameRoom.roomPassword !== gamePass){
            const embed = new EmbedBuilder()
                .setTitle('Uhoh!')
                .setDescription('It seems you do not have the correct password')
                .setColor(EMBED_COLOR);

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

            return;
        }

        if(gameRoom.creatorId == interaction.user.id){
            const embed = new EmbedBuilder()
                .setTitle('Uhoh!')
                .setDescription('It seems you have tried to join your own room. Come on now.')
                .setColor(EMBED_COLOR);

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

        const embed = new EmbedBuilder()
            .setTitle("Why welcome there!")
            .setDescription("You have been added to the channel. Have fun!")
            .setColor(EMBED_COLOR);

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

        //Add user to channel
        const channel = client.channels.cache.get(gameRoom.channelId);
        await channel.permissionOverwrites.edit(interaction.user.id, {ViewChannel: true});

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Welcome!')
            .setDescription(`Welcome to GameRoom. To start the game run one of these commands.`)
            .setFields([
                {
                    name: "Tic Tac Toe",
                    value: '/ttt {opponents mention}'
                }
            ])
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