const { Events, InteractionType, ChatInputCommandInteraction, ButtonInteraction } = require("discord.js");
const { Commands, Components } = require("..");
const logger = require('../functions/logger');

module.exports = {

    name: Events.InteractionCreate,
    /**
     * 
     * @param {ChatInputCommandInteraction | ButtonInteraction } interaction 
     */
    async run(interaction) {

        switch (interaction.type) {

            // command interaction
            case InteractionType.ApplicationCommand:

                // get command
                const command = Commands.get(interaction.commandName);
                if (!command) return logger.error('Command ' + interaction.commandName + ' does not found.');

                //run command
                try {
                    await command.run(interaction);
                    logger.cmd(interaction.commandName + ' is executed successfully');
                } catch (error) {
                    logger.error('Command: ' + interaction.commandName + ' error!');
                    console.error(error);
                }
                break;

            // button interaction
            case InteractionType.MessageComponent:

                //get button
                const key = interaction.customId.split('/')[0];
                const button = Components.get(key);

                //execute button
                try {
                    await button.run(interaction);
                    logger.log(interaction.customId + ' is executed successfully');
                } catch (error) {
                    logger.error('button: ' + interaction.customId + ' error!');
                    console.error(error);
                }
                break;
        }
    }
};