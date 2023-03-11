const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, Client } = require('discord.js');
const logger = require('../../functions/logger');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setrules')
        .setDescription('กำหนดฃ่องสำหรับแสดงกฎ')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('เลือกฃ่องกฎ')
            .setRequired(true)
        )
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction } interaction 
     * @param {Client} client 
     */
    async run(interaction, client) {

        // get channel
        const channel = interaction.options.getChannel('channel');
        // set rule channel
        await interaction.guild.setRulesChannel(channel);
        await interaction.reply({ content: 'กำหนดฃ่องสำหรับกฎแล้ว', ephemeral: true });

    }
}