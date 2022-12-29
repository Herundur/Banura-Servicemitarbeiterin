const  randomfact = async (message, random) => {

  if (message.content.toLowerCase() === "#randomfact") {
    let data = await random.getFact()
    message.reply(data.embed.description)
  }

}

module.exports = randomfact;