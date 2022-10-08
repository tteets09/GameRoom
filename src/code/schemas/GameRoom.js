const {Schema, model} = require('mongoose');

const gameRoom = new Schema({
    _id: Schema.Types.ObjectId,
    roomName: String,
    roomPassword: String,
    channelId: String,
    creatorId: String,
    joinedId: String
});

module.exports = model('GameRoom', gameRoom, 'GameRooms');