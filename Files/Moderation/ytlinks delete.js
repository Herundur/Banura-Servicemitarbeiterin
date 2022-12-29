const ytlinksDelete = (message) => {

  if (message.channel.id === "170242173579689984") {
    if (message.content.includes("https://www.youtu") || message.content.includes("https://youtu")) {
      message.channel.send("⛔Senden von Youtube-Links in diesem Channel **NICHT** möglich!⛔").then(msg => setTimeout(function() { msg.delete() }, 10000));
      message.delete();
    }
  } else return;

}

module.exports = ytlinksDelete;