const { Events, InteractionType, BaseInteraction, Client } = require("discord.js");
const client = require("../../..");
const { Commands, Components } = require("..");
const logger = require('../../../functions/logger');

module.exports = {

    name: Events.InteractionCreate,
    /**
     * 
     * @param {BaseInteraction } interaction 
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
                    await command.run(interaction, client);
                    logger.cmd(interaction.commandName + ' is executed successfully');
                } catch (error) {
                    logger.error('Command: ' + interaction.commandName + ' error!');
                    console.error(error);
                }
                break;

            // button interaction
            case InteractionType.MessageComponent:

                //get button
                {
                    const key = interaction.customId.split('/')[0];
                    const button = Components.get(key);


                    //execute button
                    try {
                        await button.run(interaction, client);
                        logger.log('Button: ' + interaction.customId + ' is executed successfully');
                    } catch (error) {
                        logger.error('Button: ' + interaction.customId + ' error!');
                        console.error(error);
                    }
                }
                break;

            // on modal submit
            case InteractionType.ModalSubmit:

                //get modal
                const modal = Components.get(interaction.customId);

                //submit modal
                try {
                    await modal.run(interaction, client);
                    logger.log('Modal: ' + interaction.customId + ' is executed successfully');
                } catch (error) {
                    logger.error('Modal: ' + interaction.customId + ' error!');
                    console.error(error);
                }
                break;

        }
    }
};