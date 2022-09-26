const express = require('express');
const ejs = require('ejs');
const chalk = require("chalk");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GameRoom = require('../../schemas/GameRoom');
const Player = require('../../schemas/GamePlayer');
const url = require('url');

module.exports = (client) => {
    client.runWeb = async () => {
        //Creating the webserver
        const app = express();

        //Setting default settings
        app.use(express.static('public'));
        app.set('views', path.join(__dirname, '/views'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({extended: true}));

        //Running the webserver on local host at port 3000
        app.listen(3000)

        //Logging to console the server is running
        console.log(chalk.green("Webserver is running..."));

        app.route('/')
            .get((req, res) => {
                res.render('index');
            })

        app.route('/join')
            .post(async (req, res) => {
                const gameId = req.body.gameId;
                const userPass = req.body.roomPass;

                const gameRoom  = await GameRoom.findOne({_id: gameId});

                if(userPass == gameRoom.roomPassword){
                    return res.render('joinedGame', {roomName: gameRoom.roomName});
                }

                res.render('join', {roomName: gameRoom.roomName, gameId: gameRoom._id, error: 'Wrong Password!'})
            })

        app.route('/join/:gameId')
            .get(async (req, res) => {
                const gameId = req.params.gameId;

                const gameRoom = await GameRoom.findOne({_id: gameId}).catch((err) => {
                    res.render('404');
                    return;
                });

                if(gameRoom) res.render('join', {roomName: gameRoom.roomName, gameId: gameRoom._id, error: ''});
            })
    }
}