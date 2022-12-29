const discord = require("discord.js")
 // EMBED BUTTONS
  const buttons = require("./buttonsList.js")
  //console.log(buttons.buttonCommandsS)
  const buttonCommands = new discord.MessageActionRow()
    .addComponents(
      new discord.MessageButton()
        .setCustomId('commands')
        .setLabel('📄')
        .setStyle('SECONDARY'))
    .addComponents(
      new discord.MessageButton()
        .setCustomId('stats')
        .setLabel('📊')
        .setStyle('SECONDARY'))
  .addComponents(
      new discord.MessageButton()
        .setCustomId('random')
        .setLabel('🎲')
        .setStyle('SECONDARY'))

const createStats = message => {
  const channels = message.guild.channels.cache;
  const user = (message.guild.members.cache.get(message.author.id))
  const userJoinDate = new Date(user.joinedTimestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const embedStats = new discord.MessageEmbed()
    .setColor("#94078C")
    .setTitle("__Server-Statistik__")
    .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .addFields(
      { name: "Nutzer*innen", value: `> 👥Menschen: ${message.guild.memberCount - 8}\n> 🤖Bots: 9` },
      { name: "Leaderboard", value: '> [🏆Rangliste der aktivsten Nutzer*innen.](https://mee6.xyz/leaderboard/170242173579689984)' },
      { name: "Location", value: `> 🇦🇹Österreich` },
      { name: "Erstelldatum", value: `> 📆${message.guild.createdAt.toLocaleDateString("de-DE", options)}` },
          /*{ name: "Channels", value: `Text: ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} \nVoice: ${channels.filter(channel => channel.type === 'GUILD_VOICE').size} `},*/
    )
    .setFooter({ text: `${message.author.username} ist am ${userJoinDate.toLocaleDateString("de-DE", options)} beigetreten.`, iconURL: message.author.avatarURL() });
  return embedStats
}

const embedRandomCommands = new discord.MessageEmbed()
.setColor("#94078C")
  .setTitle("__#random[?]__")
  .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
  .addFields(
    { name: "quote", value: "> Zufälliges Zitat aus dem Quotes-Channel. 📜" },
    { name: "video", value: "> Zufälliges Video von Youtube. ⏯️" },
    { name: "meme", value: "> Zufälliges Meme von Reddit. 🤣" },
    { name: "advice", value: "> Zufälliger Ratschlag. 🔮" },
    { name: "fact", value: "> Zufälliger Fakt. 🎓" },
    { name: "champ", value: "> Zufälliger LoL-Champ. 🐒" },
    { name: "role", value: "> Zufällige LoL-Rolle. 🕹️" },
)

let date420 = new Date(Date.UTC(2022, 3, 20, 2, 20))

const embedCommands = new discord.MessageEmbed()
  .setColor("#94078C")
  .setTitle("__Commands__")
  .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
  .setTimestamp(date420)
  .setFooter({ text: '⭐Banura Premium-Mitgliedschaft: 18,70€/Monat'})
  .addFields(
    { name: "#flipsmoken", value: "> 50/50-Wahrscheinlichkeit ob geraucht werden darf oder nicht.🌿" },
    { name: "#schere/stein/papier", value: "> Ziel des Spieles ist es, eine höherwertige Handhaltung zu haben als der Bot.✂️🪨📄" },
    { name: "#mixderwoche", value: "> Verbleibende Zeit bis zum nächsten Mix der Woche.🎶" },
    { name: "#translate", value: "> Übersetzt die letzte Bot-Nachricht von  🇬🇧 auf  🇩🇪." },
    { name: "#random", value: "> Liste aller Zufalls-Befehle.🎲" },
    { name: "#stats", value: "> Aufrufen der Server-Statistik.📊" },
    { name: "#bestseller", value: "> Spiegel-Bestseller | Kategorie: Sachbuch.📖" },
    { name: "#ttt @[Gegenspieler]", value: "> Tic-Tac-Toe oder Drei gewinnt ist ein klassisches, einfaches Zweipersonen-Strategiespiel.❎ 🅾️" },
)

const commandListCommands = (msg) => {

  if (msg.content.toLowerCase() === "#commands" || msg.content.toLowerCase() === "#command") {
    msg.channel.send({ embeds: [embedCommands], components: [buttons.buttonCommandsC] })
  }
}

const commandListRandom = (msg) => {

  if (msg.content.toLowerCase() === "#random") {
    msg.channel.send({ embeds: [embedRandomCommands], components: [buttons.buttonCommandsR] })
  }

}

const commandListStats = (message) => {

  if (message.content.toLowerCase() === "#stats") {
    createStats(message)
    message.channel.send({ embeds: [createStats(message)], components: [buttons.buttonCommandsS] })
    }

}


const commandListButtonInteraction = (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "commands") {
      interaction.update({
        embeds: [embedCommands],
        components: [buttons.buttonCommandsC]
      })
  } else if (interaction.customId === "stats") {
    interaction.update({
        embeds: [createStats(interaction.message)],
        components: [buttons.buttonCommandsS]
      }) 
  }  else if (interaction.customId === "random") {
    interaction.update({
        embeds: [embedRandomCommands],
        components: [buttons.buttonCommandsR]
      }) 
}}
}

module.exports = { commandListButtonInteraction, commandListCommands, commandListRandom, commandListStats};