const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle, Role, ButtonInteraction, TextChannel } = require('discord.js');
const logger = require('../../../functions/logger');


module.exports = {
	// component data and run
	data: {
		customId: 'reg',

		/** @param {Role} role */
		embed: (role) => {
			return new EmbedBuilder()
				.setTitle('ลงทะเบียน')
				.setDescription(
					`คลิกปุ่มด้านล่างเพื่อลงทะเบียน\nซึ่งจะปลดล็อกห้องสำหรับ ${role}`,
				)
				.setColor(role.color);
		},

		/** @param {string} custom_id */
		btn: (custom_id) => {
			return new ActionRowBuilder().setComponents(
				new ButtonBuilder()
					.setCustomId(custom_id)
					.setLabel('ลงทะเบียน')
					.setStyle(ButtonStyle.Primary)
					.setEmoji({ name: '✅' }),
			);
		},
	},

	/**@param {ButtonInteraction} interaction*/
	run: async (interaction) => {
		const data = interaction.customId.split('/');

		//get get register data
		const roleId = data[1];
		const channelId = data[2] ?? null;

		const user = interaction.user;
		const role = interaction.guild.roles.cache.get(roleId);

		// check if user has role assigned
		if (interaction.member.roles.cache.has(roleId)) {
			await interaction.reply({
				content: '❌ คุณมีบทบาทนี้อยู่แล้ว!',
				ephemeral: true,
			});
			return;
		}

		// notify message
		const embed = new EmbedBuilder()
			.setTitle('ลงทะเบียนเสร็จสิ้น')
			.setDescription(`${user} ได้ลงทะเบียนเป็น <@&${roleId}> แล้ว`)
			.setColor(0x82cd47)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp();

		// add role for registered user
		await interaction.member.roles.add(role);
		await interaction.reply({
			content: '✅ ลงทะเบียนเสร็จสิ้น',
			ephemeral: true,
		});

		// send notification message to notify channel
		if (channelId) {
			/**@type {TextChannel} */
			const channel = interaction.guild.channels.cache.get(channelId);
			await channel.send({ embeds: [embed] });
		}
	},
};
