const { readdirSync } = require('fs');

module.exports = (client) => {
    client.handleComponents = async => {
        const componentFolder = readdirSync(`./src/code/components`);

        for(const folder of componentFolder){
            const componentFile = readdirSync(`./src/code/components/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { selectMenus, modals } = client;

            switch(folder){
                case "selectMenus":
                    for(const file of componentFile){
                        const menu = require(`../../components/${folder}/${file}`);
                        selectMenus.set(menu.data.name, menu);
                    }
                    break;
                case "modals":
                    for(const file of componentFile){
                        const modal = require(`../../components/${folder}/${file}`);
                        modals.set(modal.data.name, modal);
                    }
                    break;
            }
        }
    }
}