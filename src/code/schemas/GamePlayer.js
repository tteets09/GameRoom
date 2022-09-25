const {Schema, model} = require('mongoose');

const GameRoomPlayerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    discordId: String,
    gamesPlayed: Number
});

module.exports = model('GameRoomPlayer', GameRoomPlayerSchema, 'Players');