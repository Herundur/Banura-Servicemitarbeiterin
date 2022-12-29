require("dotenv").config()

const  randomvideo = async (msg, youtube) => {

  if (msg.content.toLowerCase() === "#randomvideo" && (msg.channel.id === "748206621565648977" || msg.channel.id === "684055460302946320" || msg.channel.id === "951243124489990225")) {
    const YoutubeAPI = process.env.YoutubeAPI
    youtube.getRandomVid(YoutubeAPI, function(err, data) {
      if (err) throw err;
      msg.reply("**zufälliges Youtube-Video**: https://www.youtube.com/watch?v=" + data.id.videoId)
    })
  } else if (msg.content.toLowerCase() === "#randomvideo") {
    setTimeout(function() {
      msg.delete();
    }, 2000);
    msg.channel.send("⛔**#randomvideo** nur möglich in: <#748206621565648977>, <#684055460302946320>⛔").then(message => setTimeout(function() { message.delete() }, 10000));
  }

}

module.exports = randomvideo;