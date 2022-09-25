const express = require('express');
const ejs = require('ejs');
const chalk = require("chalk");
const path = require("path");
const bodyParser = require('body-parser');

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
    }
}