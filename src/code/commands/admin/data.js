const { SlashCommandBuilder, PermissionsBitField  } = require('discord.js');
const Player = require('../../schemas/GamePlayer');
const GameRoom = require('../../schemas/GameRoom');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('data')
        .setDescription('Returns data from the database!')
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription('Type of data wanted from the database')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction, client){
        const focusedValue = interaction.options.getFocused();
        const choices = ["users", "openGames"];
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );

        await interaction.respond(
            filtered.map((choice) => ({name: choice, value: choice}))
        );
    },
    async execute(interaction, client){
        const adminRoleID = '1023347683127214112';
        const { roles, permissions } = interaction.member;
        const choice = interaction.options.getString("type");

        let reply;

        if(roles.cache.has(adminRoleID) || permissions.has(PermissionsBitField.Flags.Administrator)){
            switch(choice){
                case "users":
                    reply = "__**Registered Users**__\n";

                    const players = await Player.find({});
                    let userCount = 1;
                    for(const player of players){
                        let user = client.users.cache.get(player.discordId);

                        reply += userCount++ +  ".\t" + user.toString() + "\t" + player._id + "\n";
                    }
                    break;
                case "openGames":
                    reply = "__**Open Games**__\n";

                    const gameRooms = await GameRoom.find({});
                    let roomCount = 1;

                    for(const gameRoom of gameRooms){
                        reply += roomCount++ + ".\t" + gameRoom.roomName + "\t" + gameRoom._id + "\n";
                    }

                    break;
                default:
                    reply = "Please use an available option";
            }
        }else {
            reply = "You do not have permission to run this command.";
        }

        await interaction.reply({
            content: reply,
            ephemeral: true
        });
    }
}