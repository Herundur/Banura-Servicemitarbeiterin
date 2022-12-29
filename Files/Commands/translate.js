const translate = async (message, translate) => {

  if (message.content.startsWith("#translate")) {

    const messages = await message.channel.messages.fetch();
    let filtered = messages.filter((msg) => msg.author.id === "951243683951444019");
    let lastBotMsg = filtered.first().content;
    const finalRes = await translate(lastBotMsg, { from: 'en', to: 'de' });
    message.reply(finalRes.text);
  }

}

module.exports = translate;