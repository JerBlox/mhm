const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes The Song Queue!'),
	async execute(interaction) {

        const queue = interaction.client.distube.getQueue(interaction);
        if (!queue) return interaction.reply(`There is nothing playing!`);
        if(interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply(`You are not in my voice channel!`);
        if(queue.paused) {
            queue.resume();
            interaction.reply("Resumed!");
        } else {
            interaction.reply("Are you dumb lol, it's not even paused");
        }
	},
};