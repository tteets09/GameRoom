<div align="center" id="top">
    <h3>Created by: Tony Teets</h3>
    <img src="https://cdn.iconscout.com/icon/free/png-256/sword-1777408-1512000.png" width="128px" alt="Swords crossed">
    <h1 align="center">GameRoom</h1>

</div>
<details open="open" id="toc">
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About the project</a>
            <ul>
                <li>
                    <a href="#features">Features</a>
                </li>
                <li>
                    <a href="#built-with">Built With </a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#usage">Usage</a>
        </li>
        <li>
            <a href="#project-tree">Project Tree</a>
        </li>
    </ol>
</details>

## About The Project

<h3 align="center"><u>Welcome to GameRoom!</u><br></h3>
<p>This is a discord bot used for creating small rooms for your users to play
games together in one channel just for them. Why don't you try it out!</p>

### Features
<ul>
    <li>Create small rooms for users to play games in</li>
    <li>Database system</li>
    <li>Few commands that are easy to use</li>

</ul>

### Built With
* [NodeJS](https://nodejs.org/en/)
* [discord.js](https://discord.js.org/#/)

## Usage
<p>There are a few simple commands that this bot has. If you look at the table below you can see what they are what they mean.</p>

| Command       | Description                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| /ping         | This command is used to test latency with the bot                                                               |
| /joingameroom | Adds the user to the GameRoom database so they can play games                                                   |
| /createroom   | Asks the user to give a room name and password and creates a GameRoom for the user with the specified arguments |
| /joingame     | Used by the person trying to join a room. If all information is correct, they will be added to the game.        |
| /ttt          | Used to run the Tic-Tac-Toe game                                                                                |
| /closeroom    | Used to close the GameRoom room.                                                                                |



## Project Tree
```bash
Project Tree

src
|-- code
|   |--bot.js
|   |-- commands
|   |   |-- admin
|   |   |   |- data.js
|   |   |-- gameroom
|   |   |   |-- closeroom.js
|   |   |   |-- createroom.js
|   |   |   |-- joingame.js
|   |   |   |-- joingameroom.js
|   |   |-- games
|   |   |   |-- ttt.js
|   |   |-- tools
|   |       |-- ping.js
|   |-- components
|   |   |-- modals
|   |       |-- creategameModal.js
|   |-- events
|   |   |-- client
|   |   |   |-- interactionCreate.js
|   |   |   |-- ready.js
|   |   |-- mongo
|   |       |-- connected.js
|   |       |-- connecting.js
|   |       |-- disconnected.js
|   |       |-- err.js
|   |-- functions
|   |   |-- handlers
|   |   |   |-- handleCommands.js
|   |   |   |-- handleComponents.js
|   |   |   |-- handleEvents.js
|   |-- schemas
|       |-- GamePlayer.js
|       |-- GameRoom.js
|-- demo_video
|   |-- DemoVideo.mp4
|-- design
|   |-- closeroomCommand.pdf
|   |-- createroomCommand.pdf
|   |-- joingameCommand.pdf
|   |-- joingameroomCommand.pdf
|-- self_review
    | tony_teets.pdf
```