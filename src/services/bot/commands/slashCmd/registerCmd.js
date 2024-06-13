const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, Client, ChatInputCommandInteraction, ChannelType, Message } = require("discord.js");
const logger = require('../../../../functions/logger');
const regData = require('../../components/registerData')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('reg-form')
        .setDescription('กำหนดระบบลงทะเบียน')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        // role options
        .addRoleOption(option => option
            .setName('role')
            .setDescription('เลือกบทบาท สำหรับลงทะเบีบน*')
            .setRequired(true)
        )
        // alert channel options
        .addChannelOption(option => option
            .addChannelTypes(ChannelType.GuildText)
            .setName('notify')
            .setDescription('เลือกช่องแจ้งเตือน สถาณะลงทะเบียน')
        ),
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction, client) {


        // get role and notifyChannel
        const role = interaction.options.getRole('role');
        let channel = ''
        if (interaction.options.getChannel('notify')) {
            channel = interaction.options.getChannel('notify').id
        }


        // set button custom id
        const buttonID = `reg/${role.id}/${channel}`;

        // get register form
        const embed = regData.data.embed(role);
        const btn = regData.data.btn(buttonID);

        // create register form
        await interaction.reply({ embeds: [embed], components: [btn] }).catch(err => { });
        logger.log('Register form created');

    }
}