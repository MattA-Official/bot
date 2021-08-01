import { MessageActionRow, MessageButton } from 'discord.js';

export const data = {
	name: 'button',
	description: 'Creates a button',
};

export const slash = true;

export const interaction = async (client, interaction) => {
	const button = new MessageButton()
		.setCustomId('primary')
		.setLabel('Primary')
		.setStyle('PRIMARY');

	const row = new MessageActionRow().addComponents(button);

	await interaction.reply({ content: 'ping...', components: [row] });

	const filter = (i) => i.customId === 'primary';
	const collector = interaction.channel.createMessageComponentCollector({
		filter,
		time: 15000,
	});

	collector.on('collect', async (i) => {
		if (i.customId === 'primary') {
			await interaction.editReply({
				content: 'Pong!',
				components: [],
			});
		}
	});
};
