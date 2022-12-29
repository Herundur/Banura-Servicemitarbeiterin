const  randomquote = (msg, client) => {

    let quotes = []
    if (msg.content.toLowerCase() === "#randomquote") {
        const channel = client.channels.cache.get("724535385077579818");
        let i = Math.floor(Math.random() * 100)
        channel.messages.fetch({ limit: 100 })
          .then(messages => {
            messages.forEach(message => quotes.push(message.content))
            msg.reply(quotes[i])
          })
      }

}

module.exports = randomquote;