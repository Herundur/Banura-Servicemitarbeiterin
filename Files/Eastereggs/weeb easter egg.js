const  weebEasterEgg = async (message, random) => {

    let blacklisted = ['weeb', 'weebs', "hentai", "anime", "manga"]
    if (blacklisted.some(element => message.content.toLowerCase().includes(element)) && message.author.bot === false) {
      let data = await random.getNeko()
      message.reply("**I HOSS FKN WEEBS** " + data.embed.image.url)
      return;
    }
    
}

module.exports = weebEasterEgg;