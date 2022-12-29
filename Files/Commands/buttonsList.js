const discord = require('discord.js');


const buttonCommandsC = new discord.MessageActionRow()
	.addComponents(
		new discord.MessageButton()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('SECONDARY')
      .setDisabled(true))
	.addComponents(
		new discord.MessageButton()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('SECONDARY')
      .setDisabled(false))
  .addComponents(
		new discord.MessageButton()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('SECONDARY')
      .setDisabled(false))

const buttonCommandsR = new discord.MessageActionRow()
	.addComponents(
		new discord.MessageButton()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('SECONDARY')
      .setDisabled(false))
	.addComponents(
		new discord.MessageButton()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('SECONDARY')
      .setDisabled(false))
  .addComponents(
		new discord.MessageButton()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('SECONDARY')
      .setDisabled(true))

const buttonCommandsS = new discord.MessageActionRow()
	.addComponents(
		new discord.MessageButton()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('SECONDARY')
      .setDisabled(false))
	.addComponents(
		new discord.MessageButton()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('SECONDARY')
      .setDisabled(true))
  .addComponents(
		new discord.MessageButton()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('SECONDARY')
      .setDisabled(false))


const reminderOff = new discord.MessageActionRow()
	.addComponents(
		new discord.MessageButton()
			.setCustomId('on')
			.setLabel('✔')
			.setStyle('SUCCESS')
      .setDisabled(false))
	.addComponents(
		new discord.MessageButton()
			.setCustomId('off')
			.setLabel('✖')
			.setStyle('DANGER')
      .setDisabled(true))

const reminderOn = new discord.MessageActionRow()
	.addComponents(
		new discord.MessageButton()
			.setCustomId('on')
			.setLabel('✔')
			.setStyle('SUCCESS')
      .setDisabled(true))
	.addComponents(
		new discord.MessageButton()
			.setCustomId('off')
			.setLabel('✖')
			.setStyle('DANGER')
      .setDisabled(false))


module.exports = {
  buttonCommandsS: buttonCommandsS,
  buttonCommandsR: buttonCommandsR,
  buttonCommandsC: buttonCommandsC,
  reminderOff: reminderOff,
  reminderOn: reminderOn,
}
