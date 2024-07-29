const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	        .setName('stop')
		.setDescription('Stop Song Queue!'),
	async execute(interaction) {

                const queue = interaction.client.distube.getQueue(interaction);
                if (!queue) return interaction.reply(`There is nothing playing!`);
                if(interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply(`You are not in my voice channel!`);

                interaction.reply("Queue Ended!");
                interaction.client.distube.stop(interaction);
        },
};