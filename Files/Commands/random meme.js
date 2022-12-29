const  randommeme = async (message, random) => {

  if (message.content.toLowerCase() === "#randommeme") {
    let data = await random.getMeme()

    if (data.embed.image.url.includes(".gif")) {
      message.reply(data.embed.image.url)
    } else if (data.embed.image.url.includes(".png")) {
      message.reply(data.embed.image.url)
    } else if (data.embed.image.url.includes(".jpg")) {
      message.reply(data.embed.image.url)
    } else {
      message.reply("Moch numoi gach bitte").then(message => setTimeout(function() { message.delete() }, 10000));
    }
  }
}

module.exports = randommeme;