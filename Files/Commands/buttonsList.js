const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const discord = require('discord.js');


const buttonCommandsC = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('Secondary')
      .setDisabled(true))
	.addComponents(
		new ButtonBuilder()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('Secondary')
      .setDisabled(false))
  .addComponents(
		new ButtonBuilder()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('Secondary')
      .setDisabled(false))

const buttonCommandsR = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('Secondary')
      .setDisabled(false))
	.addComponents(
		new ButtonBuilder()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('Secondary')
      .setDisabled(false))
  .addComponents(
		new ButtonBuilder()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('Secondary')
      .setDisabled(true))

const buttonCommandsS = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('commands')
			.setLabel('📄')
			.setStyle('Secondary')
      .setDisabled(false))
	.addComponents(
		new ButtonBuilder()
			.setCustomId('stats')
			.setLabel('📊')
			.setStyle('Secondary')
      .setDisabled(true))
  .addComponents(
		new ButtonBuilder()
			.setCustomId('random')
			.setLabel('🎲')
			.setStyle('Secondary')
      .setDisabled(false))


const reminderOff = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('on')
			.setLabel('✔')
			.setStyle('Success')
      .setDisabled(false))
	.addComponents(
		new ButtonBuilder()
			.setCustomId('off')
			.setLabel('✖')
			.setStyle('Danger')
      .setDisabled(true))

const reminderOn = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('on')
			.setLabel('✔')
			.setStyle('Success')
      .setDisabled(true))
	.addComponents(
		new ButtonBuilder()
			.setCustomId('off')
			.setLabel('✖')
			.setStyle('Danger')
      .setDisabled(false))


module.exports = {
  buttonCommandsS: buttonCommandsS,
  buttonCommandsR: buttonCommandsR,
  buttonCommandsC: buttonCommandsC,
  reminderOff: reminderOff,
  reminderOn: reminderOn,
}
