const {Schema, model} = require('mongoose');

const gameRoom = new Schema({
    _id: Schema.Types.ObjectId,
    roomName: String,
    roomPassword: String,
    gameType: String,
    creatorId: String
})

module.exports = model('GameRoom', gameRoom, 'GameRooms');