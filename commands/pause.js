const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause The Song Queue!'),
	async execute(interaction) {

        const queue = interaction.client.distube.getQueue(interaction);
        if (!queue) return interaction.reply(`There is nothing playing!`);
        if(interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply(`You are not in my voice channel!`);
        if(queue.paused) {
            return interaction.reply("The song is already paused! Use `/resume` to continue the song");
        }

        queue.pause();
        interaction.reply("Paused!");
	},
};