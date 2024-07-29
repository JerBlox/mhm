const { Events } = require('discord.js');
const Client = require("../handlers/ClientStart.js");
const Discord = require('discord.js');
/**
 * @param {Client} client 
 */

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if(!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
	    if (!command) {
		    console.error(`No command matching ${interaction.commandName} was found.`);
		    return;
	    }
		const embed = new Discord.EmbedBuilder()
      		.setTitle("Command Log")
			.addFields(
                { name: 'Server:', value: `${interaction.guild}`, inline: true },
                { name: 'Server ID:', value: `${interaction.guild.id}`, inline: true },
                { name: 'Command:', value: `${interaction.commandName}`},
            )
     	 	.setColor("Green")
      		.setTimestamp()
      	interaction.client.channels.cache.get('1137652594613948446').send({ embeds: [embed] })
        if(interaction.guild.id !== "961793380445204550" && interaction.guild.id !== "877408138532384858" && interaction.guild.id !== "902827768172134450" && interaction.guild.id !== "1019987640231149659" && interaction.guild.id !== "1172546195902709772" && interaction.commandName !== "help") return interaction.reply("Your server is not whitelisted, join discord.gg/SetsM2bRUC to request access!");
	    try {
		    await command.execute(interaction);
	    } catch (error) {
	    	console.error(error);
	    	if (interaction.replied || interaction.deferred) {
	    		return;
	    	} else {
	    		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    	}
	    }
	},
};