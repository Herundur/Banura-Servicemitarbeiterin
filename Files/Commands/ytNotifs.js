const Fcn = async (ytNotifs, client) => {

  ytNotifs.start(120, "./youtubeNotifsData.json");
  ytNotifs.events.on("newVid", (obj) => {
    let discordChannelId;
    const channel2 = client.channels.find
    switch (obj.vid.id) {
      case "UCMFPEX2nas4KmbvNwnSm9qQ":
        discordChannelId = "684055460302946320";
        break;
      case "UCAL3JXZSzSm8AlZyD3nQdBA":
        discordChannelId = "684055460302946320";
        break;
      case "UCJLZe_NoiG0hT7QCX_9vmqw":
        discordChannelId = "684055460302946320";
        break;
      case "UCBa659QWEk1AI4Tg--mrJ2A":
        discordChannelId = "684055460302946320";
        break;
      case "UCHC4G4X-OR5WkY-IquRGa3Q":
        discordChannelId = "684055460302946320";
        break;
      case "UCtHaxi4GTYDpJgMSGy7AeSw":
        discordChannelId = "684055460302946320";
        break;
    };
    console.log(ytNotifs.msg("{channelName} just uploaded a new video!\n{vidUrl}", obj));

    //[<@${"170242045510811649"}>, <@${"419479129646301184"}>]
    client.channels.cache.get("684055460302946320").send(ytNotifs.msg(`🎥**{channelName}** hod a neichs Vid: **{vidName}**\n{vidUrl}`, obj));
  });
}

const Sub = (ytNotifs) => {
  ytNotifs.subscribe(["UCMFPEX2nas4KmbvNwnSm9qQ"]);
  ytNotifs.subscribe(["UCAL3JXZSzSm8AlZyD3nQdBA"]);
  ytNotifs.subscribe(["UCJLZe_NoiG0hT7QCX_9vmqw"]);
  ytNotifs.subscribe(["UCBa659QWEk1AI4Tg--mrJ2A"]);
  ytNotifs.subscribe(["UCHC4G4X-OR5WkY-IquRGa3Q"]);
  ytNotifs.subscribe(["UCtHaxi4GTYDpJgMSGy7AeSw"]);
}


module.exports = {Fcn, Sub};