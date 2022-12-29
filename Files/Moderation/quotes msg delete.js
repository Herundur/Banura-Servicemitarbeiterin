const quotesMsgDelete = (message) => {

  if (message.channel.id === "724535385077579818") {
    const specialKey = [`"`,`„`,`“`]
    if ((!(specialKey.includes(message.content.charAt(0)) || specialKey.includes(message.content.charAt(message.content.length-1)))) && message.author.bot === false) {
      message.delete();
      message.channel.send("⛔Nachrichten in <#724535385077579818> müssen mit **Anführungszeichen** beginnen oder enden!⛔").then(msg => setTimeout(function() { msg.delete() }, 10000));
      return;
    }
  }

}

module.exports = quotesMsgDelete;