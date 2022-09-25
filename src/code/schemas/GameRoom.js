const {Schema, model} = require('mongoose');
const { Player } = require('GamePlayer');

const gameRoom = new Schema({
    _id: Schema.Types.ObjectId,
    roomName: String,
    roomPassword: String,
})