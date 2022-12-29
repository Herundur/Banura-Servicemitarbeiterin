const searchEmbed = (imageUrl, searchTerm) => {
  const googleSearchEmbed = {
  author: {
		name: `${searchTerm}`,
		icon_url: 'https://cdn.notsobot.com/brands/google-go.png',
	},
	color: "#94078C",
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
	color: "#94078C",

}
return googleSearchFailEmbed    
};

const dotimg = async (msg, discord, ) => {

  if (msg.content.toLowerCase().startsWith(".im ")) {

  const imageButtons = new discord.MessageActionRow()
      .addComponents(
      new discord.MessageButton()
        .setCustomId('gobackPage')
        .setLabel('◁')
        .setStyle('SECONDARY')
        .setDisabled(true))
      .addComponents(
      new discord.MessageButton() 
        .setCustomId('skipPage')
        .setLabel('▷')
        .setStyle('SECONDARY')
        .setDisabled(false))
      .addComponents(
      new discord.MessageButton()
        .setCustomId('delete')
        .setLabel('✖')
        .setStyle('DANGER'))

  const imageObj = {
        page: 0,
        searchTerm: 0,
        images: 0,
      }

      imageObj.searchTerm = msg.content.slice(4)

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
          msg.reply({ embeds: [searchFailEmbed(imageObj.searchTerm)], allowedMentions: {repliedUser: false}})
          return
        }
      
      if (results.result) {
          msg.reply({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false}})
          .then(msg => {
            
            const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000});
            collector.on('collect', async i => {
                  if (i.customId === "gobackPage" && i.user.id === msg.mentions.repliedUser.id) {
                          if (imageObj.page === 1) {
                              imageButtons.components[0].setDisabled(true);
                          }
                          if (imageButtons.components[1].disabled === true) {
                              imageButtons.components[1].setDisabled(false);
                          }
                          
                          --imageObj.page
                          i.deferUpdate()
                          await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                          
                  } else if (i.customId === "skipPage" && i.user.id === msg.mentions.repliedUser.id) {
                        if (imageObj.page >= 0) {
                              imageButtons.components[0].setDisabled(false);
                          }
                          if (imageObj.images[imageObj.page + 2] === undefined) {
                              imageButtons.components[1].setDisabled(true);
                          }
                        ++imageObj.page
                          i.deferUpdate()
                          await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                          
                  }  else if (i.user.id === msg.mentions.repliedUser.id) {
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



module.exports = dotimg;