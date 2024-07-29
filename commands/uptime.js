const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription("Shows the Bot's Uptime!"),
	async execute(interaction) {

        let days = Math.floor(interaction.client.uptime / 86400000);
        let hour = Math.floor(interaction.client.uptime / 3600000) % 24;
        let minute = Math.floor(interaction.client.uptime / 60000) % 60;
        let second = Math.floor(interaction.client.uptime / 1000) % 60;

        const embed = new Discord.EmbedBuilder()
        .setTitle("Current Uptime")
        .setDescription(`\`${days}\` days, \`${hour}\` hours, \`${minute}\` minutes, and \`${second}\` seconds`)
        .setColor("Green")

        interaction.reply({ embeds: [embed] });

	},
};