const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const DisTube = require("distube");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loop The Queue Based on Choice!')
        .addStringOption(option => 
            option.setName("mode")
            .setDescription("Mode?")
            .setChoices(
                { name: "Disable", value: "0" },
                { name: "This Song Only", value: "1" },
                { name: "The Entire Queue", value: "2" },
            )
            .setRequired(true)),
	async execute(interaction) {
        const choiceValue = Number(interaction.options.getString("mode"));
		const queue = interaction.client.distube.getQueue(interaction);
        if (!queue) return interaction.reply(`There is nothing playing!`);
        if(interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply(`You are not in my voice channel!`);

        queue.setRepeatMode(choiceValue);
        if(choiceValue == 0){
            interaction.reply("Set repeat mode to `DISABLED`");
        } else if (choiceValue == 1) {
            interaction.reply("Set repeat mode to `THIS SONG ONLY`");
        } else {
            interaction.reply("Set repeat mode to `ENTIRE QUEUE`");
        }
	},
};