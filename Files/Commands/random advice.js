const  randomadvice = async (msg, random) => {

  if (msg.content.toLowerCase() === "#randomadvice") {
    let data = await random.getAdvice()
    msg.reply(data.embed.description)
  }

}

module.exports = randomadvice;