const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips Current Song!'),
	async execute(interaction) {

                const queue = interaction.client.distube.getQueue(interaction);
                if (!queue) return interaction.reply(`There is nothing playing!`);
                if(interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return await interaction.reply(`You are not in my voice channel!`);
                if(queue.songs.length == 1) return interaction.reply("Cannot skip the last song in the queue, if you'd like to stop, use the `/stop` command!");

                interaction.reply("Skipped the song!");
                interaction.client.distube.skip(interaction);

	},
};