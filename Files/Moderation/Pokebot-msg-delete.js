const pokemsgdelete = (msg) => {

    if (msg.author.id === "716390085896962058" && msg.channelId !== "974283737145675786") {
        msg.delete();
      }

}

module.exports = pokemsgdelete;