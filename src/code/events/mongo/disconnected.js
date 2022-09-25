const chalk = require('chalk');

module.exports = {
    name: "Disconnected",
    execute() {
        console.log(chalk.red("[Database Status]: Disconnected."))
    }
}