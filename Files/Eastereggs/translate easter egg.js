const translateEasterEgg = async (message, translate) => {

  if (message.content.startsWith("#africa")) {
    const messages = await message.channel.messages.fetch();
    let lastMsg = messages.at(1)
    let lastMsgCont = lastMsg.content;
    const res = await translate(lastMsgCont, { to: 'af' });
    message.reply(`"*${lastMsgCont}*" bedeutet auf **Afrikanisch**: *${res.text}*`)
  } else if (message.content.startsWith("#csgo")) {
    const messages = await message.channel.messages.fetch();
    let lastMsg = messages.at(1)
    let lastMsgCont = lastMsg.content;
    const res = await translate(lastMsgCont, { to: 'ru' });
    message.reply(`"*${lastMsgCont}*" bedeutet auf **Russisch**: *${res.text}*`)
  } else if (message.content.startsWith("#simon")) {
    const messages = await message.channel.messages.fetch();
    let lastMsg = messages.at(1)
    let lastMsgCont = lastMsg.content;
    const res = await translate(lastMsgCont, { to: 'ja' });
    message.reply(`"*${lastMsgCont}*" bedeutet auf **Japanisch**: *${res.text}*`)
  }

}

module.exports = translateEasterEgg;