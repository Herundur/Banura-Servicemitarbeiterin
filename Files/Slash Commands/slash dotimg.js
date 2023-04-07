const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders")
const { ComponentType } = require('discord.js');

const searchEmbed = (imageUrl, searchTerm) => {
  const googleSearchEmbed = {
  author: {
		name: `${searchTerm}`,
		icon_url: 'https://cdn.notsobot.com/brands/google-go.png',
	},
	color: 0x94078C,
	image: {
		url: imageUrl,
	},
}
return googleSearchEmbed    
};

const searchFailEmbed = (searchTerm) => {
  const googleSearchFailEmbed = {
  title: "❗FEHLER❗",
  description: `Es wurden keine mit deiner Suchanfrage **${searchTerm}** übereinstimmenden Dokumente gefunden oder das Dateiformat ist nicht lesbar.`,
  author: {
		name: `${searchTerm}`,
		icon_url: 'https://cdn.notsobot.com/brands/google-go.png',
	},
	color: 0x94078C,

}
return googleSearchFailEmbed    
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("img")
        .setDescription("Google Bildersuche")
        .addStringOption(option =>
            option.setName('suchbegriff')
                .setDescription('warum verwenden Sie flip')
                .setRequired(true)),
    async execute(interaction) {
      const input = interaction.options.getString("suchbegriff")

      const imageButtons = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder()
        .setCustomId('gobackPage')
        .setLabel('◁')
        .setStyle('Secondary')
        .setDisabled(true))
      .addComponents(
      new ButtonBuilder() 
        .setCustomId('skipPage')
        .setLabel('▷')
        .setStyle('Secondary')
        .setDisabled(false))
      .addComponents(
      new ButtonBuilder()
        .setCustomId('delete')
        .setLabel('✖')
        .setStyle('Danger'))

  const imageObj = {
        page: 0,
        searchTerm: 0,
        images: 0,
      }

      imageObj.searchTerm = input

      const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');


      const test = await GOOGLE_IMG_SCRAP({
            search: `${imageObj.searchTerm}`,
            limit: 20,
        }).then(results => {


        imageObj.images = results.result

        for (let i = 0; i < results.result.length; i += 2) {
          imageObj.images.splice(i, 1)
        };


      if (!results.result) {
          interaction.reply({ embeds: [searchFailEmbed(imageObj.searchTerm)], allowedMentions: {repliedUser: false}})
          return
        }
      
      if (results.result) {
        interaction.reply({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false}})
        interaction.fetchReply()
          .then(msg => {
            const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000});
            collector.on('collect', async i => {
                  if (i.customId === "gobackPage" && i.user.id === interaction.user.id) {
                          if (imageObj.page === 1) {
                              imageButtons.components[0].setDisabled(true);
                          }
                          if (imageButtons.components[1].disabled === true) {
                              imageButtons.components[1].setDisabled(false);
                          }
                          
                          --imageObj.page
                          i.deferUpdate()
                          await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                          
                  } else if (i.customId === "skipPage" && i.user.id === interaction.user.id) {
                        if (imageObj.page >= 0) {
                              imageButtons.components[0].setDisabled(false);
                          }
                          if (imageObj.images[imageObj.page + 2] === undefined) {
                              imageButtons.components[1].setDisabled(true);
                          }
                        ++imageObj.page
                          i.deferUpdate()
                          await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                          
                  }  else if (i.user.id === interaction.user.id) {
                        await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [], allowedMentions: {repliedUser: false}})
                        collector.stop()
                      
                      }
            })
          collector.on('end', collected => {
            msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [], allowedMentions: {repliedUser: false}});
          });
      })}
      })
      
    }

}