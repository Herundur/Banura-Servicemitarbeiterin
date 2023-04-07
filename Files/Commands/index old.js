require("dotenv").config()
//npm i @discord/opus

const discord = require("discord.js")
const youtube = require('youtube-random-video');
const random = require("something-random-on-discord").Random
const translate = require('@vitalets/google-translate-api');
//const ytNotifs = require("youtube-notifs");
const GoogleImages = require('google-images');
const axios = require("axios");
const mongoose = require("mongoose")
require('events').EventEmitter.defaultMaxListeners = 40;
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_SCHEDULED_EVENTS", "GUILD_PRESENCES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES"], 
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
})


// STATUS
//client.on('debug', console.log);
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`)
  const mongoPw = process.env.mongoPw
  await mongoose.connect(
    `mongodb+srv://Heredur:${mongoPw}@banura.rk1bp.mongodb.net/?retryWrites=true&w=majority`,
    {
      keepAlive: true
    }   
  )

  const statusRotator = () => {
    client.user.setActivity("#commands", { type: "LISTENING" })
    setTimeout(function() {
      client.user.setActivity("#ttt @Gegner", { type: "PLAYING" })
    }, 300 * 1000);
    setTimeout(function() {
      statusRotator()
    }, 600 * 1000);
  }

  statusRotator()
  
})


// HEY HEY

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "hey hey") {
    msg.reply("HOW WILL I KNOW HE'S THE ONE?")
  }
})

// POKEBOT MSG DELETE

client.on("messageCreate", msg => {
  if (msg.author.id === "716390085896962058" && msg.channelId !== "974283737145675786") {
    msg.delete();
  }
})

// RANDOM QUOTES
let quotes = []

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#randomquote") {
    const channel = client.channels.cache.get("724535385077579818");
    let i = Math.floor(Math.random() * 100)
    channel.messages.fetch({ limit: 100 })
      .then(messages => {
        console.log(`Received ${messages.size} messages`);
        messages.forEach(message => quotes.push(message.content))
        msg.reply(quotes[i])
      })
  }
})

// RANDOM NUMBER

const randomNumber = Math.floor(Math.random() * 100)

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#zufälligezahl") {
    let randomNumber = Math.floor(Math.random() * 100)
    msg.reply(`Zufällige Zahl: ${randomNumber}`)
  }
})

// FLIP SMOKEN

client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase().startsWith("#flip")) {
    let randomNumber2 = Math.floor(Math.random() * 100)
    let messageToEdit = await msg.channel.send("Loading: 🔴🔴🔴")
    console.log(randomNumber2);
    setTimeout(function() {
      messageToEdit.edit("Loading: 🟢🔴🔴")
    }, 1500);
    setTimeout(function() {
      messageToEdit.edit("Loading: 🟢🟢🔴")

    }, 3000);
    setTimeout(function() {
      messageToEdit.edit("Loading: 🟢🟢🟢")
    }, 4500);
    setTimeout(function() {
      if (randomNumber2 < 50) {
        messageToEdit.edit(`Ergebnis: ||✅||`)
      } else { messageToEdit.edit("Ergebnis: ||❌||") }
    }, 6500);
  }
})

// DELETE YOUTUBE LINKS

client.on("messageCreate", message => {
  if (message.channel.id === "170242173579689984") {
    if (message.content.includes("https://www.youtube.com")) {
      message.channel.send("⛔Senden von Youtube-Links in diesem Channel **NICHT** möglich!⛔").then(msg => setTimeout(function() { msg.delete() }, 10000));
      message.delete();
    }
  } else return;
})

// EMBED BUTTONS

const buttons = require("./embeds/buttonsList.js")
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

client.on("interactionCreate", interaction => {
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
}}})


// EMBED -COMMANDS

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

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#commands" || msg.content.toLowerCase() === "#command") {
    msg.channel.send({ embeds: [embedCommands], components: [buttons.buttonCommandsC] })
  }
})

// EMBED RANDOM COMMANDS

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

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#random") {
    msg.channel.send({ embeds: [embedRandomCommands], components: [buttons.buttonCommandsR] })
  }
})

// EMBED SERVER STATS


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

client.on("messageCreate", message => {
  if (message.content.toLowerCase() === "#stats") {
  createStats(message)
  message.channel.send({ embeds: [createStats(message)], components: [buttons.buttonCommandsS] })
  }
})

// EMBED SPIEGEL BESTSELLER

client.on("interactionCreate", interaction => {
  exportsSpiegel.pages(interaction, 1, "forward0", "back1")
  exportsSpiegel.pages(interaction, 2, "forward1", "back2")
  exportsSpiegel.pages(interaction, 3, "forward2", "back3")
  exportsSpiegel.pages(interaction, 4, "forward3", "back4")
  exportsSpiegel.pages(interaction, 5, "forward4", "back0")
})

const exportsSpiegel = require("./embeds/spiegelbestseller");
client.on("messageCreate", message => {
  if (message.content.toLowerCase() === "#bestseller") {
  message.channel.send({ embeds: [exportsSpiegel.embedExports[0]], components: [exportsSpiegel.buttonExports[0]] })
  }
})

// RANDOM YOUTUBE VID

client.on("messageCreate", msg => {
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
})

// TIME LEFT MIX DER WOCHE
/*
let interval;
const eventDay = new Date(Date.UTC(2022, 3, 25, -1, 0, 0));

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countDownFn = () => {
  const now = new Date();
  const timeSpan = eventDay - now;
  if (timeSpan <= -now) {
    console.log("Unfortunately we have past the event day");
    clearInterval(interval);
    return;
  } else if (timeSpan <= 0) {
    console.log("Today is the event day");
    clearInterval(interval);
    return;
  } else {
    const days = Math.floor(timeSpan / day);
    const hours = Math.floor((timeSpan % day) / hour);
    const minutes = Math.floor((timeSpan % hour) / minute);
    const seconds = Math.floor((timeSpan % minute) / second);

    const zeit = [days, hours, minutes, seconds];
    return zeit;
  }
};

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#mixderwoche") {
    msg.reply(`🎶Neuer **Mix der Woche** in ${countDownFn()[0]} Tagen, ${countDownFn()[1]} Stunden, ${countDownFn()[2]} Minuten, ${countDownFn()[3]} Sekunden.`)
  }
})

//messages.forEach(message => quotes.push(message.content))
*/
// YOUTUBE NOTIFICATION
/*
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

ytNotifs.subscribe(["UCMFPEX2nas4KmbvNwnSm9qQ"]);
ytNotifs.subscribe(["UCAL3JXZSzSm8AlZyD3nQdBA"]);
ytNotifs.subscribe(["UCJLZe_NoiG0hT7QCX_9vmqw"]);
ytNotifs.subscribe(["UCBa659QWEk1AI4Tg--mrJ2A"]);
ytNotifs.subscribe(["UCHC4G4X-OR5WkY-IquRGa3Q"]);
ytNotifs.subscribe(["UCtHaxi4GTYDpJgMSGy7AeSw"]);
*/// SCHERE STEIN PAPIER

let result
const zufall = (k) => {
  if (k === 0) {
    let result = "Schere✂️"
    return result;
  } else if (k === 1) {
    let result = "Stein🪨"
    return result;
  } else if (k === 2) {
    let result = "Papier📄"
    return result;
  }
}

let countdown = (messageToEdit, d, j, msg) => {
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🔴🔴")
  }, 500);
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🟢🔴")
  }, 1000);
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🟢🟢")
  }, 1500);
  setTimeout(function() {
    messageToEdit.edit(`Bot spielt: **${d}**`)
  }, 2000);
  text("Schere✂️", "Papier📄", "Stein🪨", d, j, messageToEdit, msg)
  text("Stein🪨", "Schere✂️", "Papier📄", d, j, messageToEdit, msg)
  text("Papier📄", "Stein🪨", "Schere✂️", d, j, messageToEdit, msg)
  setTimeout(function() {
    if (j === "Brunnen🤡") {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}**           https://media.giphy.com/media/3rZ1KMI2p485QtNY9x/giphy.gif`)
    }
  }, 4250);
}

const ssp = {
  reply(karte, msg) {
    let k = Math.floor(Math.random() * 3)
    let j = karte
    if (zufall(k) === "Papier📄") {
      let d = "Papier📄"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg))
    } else if (zufall(k) === "Stein🪨") {
      let d = "Stein🪨"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg))
    } else if (zufall(k) === "Schere✂️") {
      let d = "Schere✂️"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg));
    }
  }
};

const text = (karte, loser, win, d, j, messageToEdit, msg) => {
  setTimeout(function() {
    if (j === karte && d === loser) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}**`)
      setTimeout(function() {
        messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}** \n\n${msg.author} gewinnt!🏆`)
      }, 750);
    } else if (j === karte && d === win) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${d}** schlägt **${j}**`)
      setTimeout(function() {
        messageToEdit.edit(`Bot spielt: **${d}** \n\n**${d}** schlägt **${j}** \n\n ${msg.author} verliert!💀`)
      }, 750);
    } else if (j === karte && d === karte) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**🔁UNENTSCHIEDEN🔁**`)
    }
  }, 4250);
}

client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase() === "#schere" || "#stein" || "#papier" || "brunnen") {
    if (msg.content.toLowerCase() === "#schere") {
      ssp.reply("Schere✂️", msg);
    } else if (msg.content.toLowerCase() === "#stein") {
      ssp.reply("Stein🪨", msg);
    } else if (msg.content.toLowerCase() === "#papier") {
      ssp.reply("Papier📄", msg);
    } else if (msg.content.toLowerCase() === "#brunnen") {
      ssp.reply("Brunnen🤡", msg);
    }
  }
})

// ADVICE

client.on("messageCreate", async message => {
  if (message.content.toLowerCase() === "#randomadvice") {
    let data = await random.getAdvice()
    message.reply(data.embed.description)
  }
})

// RANDOM MEME

client.on("messageCreate", async message => {
  if (message.content.toLowerCase() === "#randommeme") {
    let data = await random.getMeme()

    if (data.embed.image.url.includes(".gif")) {
      message.reply(data.embed.image.url)
    } else if (data.embed.image.url.includes(".png")) {
      message.reply(data.embed.image.url)
    } else if (data.embed.image.url.includes(".jpg")) {
      message.reply(data.embed.image.url)
    } else {
      message.reply("Moch numoi gach bitte").then(message => setTimeout(function() { message.delete() }, 10000));
    }
  }
})

// RANDOM FACT

client.on("messageCreate", async message => {
  if (message.content.toLowerCase() === "#randomfact") {
    let data = await random.getFact()
    message.reply(data.embed.description)
  }
})

// ANIME TRIGGER EASTER EGG
let blacklisted = ['weeb', 'weebs', "hentai", "anime", "manga"]

client.on("messageCreate", async message => {
  if (blacklisted.some(element => message.content.toLowerCase().includes(element)) && message.author.bot === false) {
    let data = await random.getNeko()
    message.reply("**I HOSS FKN WEEBS** " + data.embed.image.url)
    return;
  }
})

// RANDOM ROLE

const lolRoles = ["ADC <:adc:961375127726063628>", "Jungle <:jungle:961375060977913916>", "Support <:support:961375044599181323>", "Toplane <:toplane:961375031236108378>", "Midlane <:midlane:961375105508835368>"];

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#randomrole") {
    let i = Math.floor(Math.random() * 5)
    msg.reply(`Zufällige Rolle: **${lolRoles[i]}**`)
  }
})

// RANDOM CHAMP

const lolChamps = ["Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Azir POG POG POG", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'gath", "Corki", "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "Kai'sa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'zix", "Kindred", "Kled", "Kog'maw", "Leblanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux - Lucis = Licht (lat.)", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'sai", "Rell", "Renata", "Glasc", "Renekton", "Rengar", "Riven", "Rumble", "Ryze (nice pog gz banger Champ change my mind du Idiot)", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'koz (kompletter Banger vü Spaß)", "Vex", "Vi", "Viegog", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Lmao", "Yasuo (bitte rerolln weil Dreckschamp)", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"];

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#randomchamp") {
    let i = Math.floor(Math.random() * 159)
    msg.reply(`Zufälliger Champ: **${lolChamps[i]}**`)
  }
})

// TRANSLATE

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("#translate")) {

    const messages = await message.channel.messages.fetch();
    let filtered = messages.filter((msg) => msg.author.id === "951243683951444019");
    let lastBotMsg = filtered.first().content;
    const finalRes = await translate(lastBotMsg, { from: 'en', to: 'de' });
    message.reply(finalRes.text);
  }
});

// TRANSLATE EASTEREGGS

client.on("messageCreate", async (message) => {
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
});

// LEADERBOARD

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#leaderboard") {
    msg.reply(`🏆**Spieler-Rangliste:** https://mee6.xyz/leaderboard/170242173579689984`)
  }
})

// QUOTES CHANNEL MSG DELETE


client.on("messageCreate", message => {
  if (message.channel.id === "724535385077579818") {
    const specialKey = [`"`,`„`,`“`]
    if ((!(specialKey.includes(message.content.charAt(0)) || specialKey.includes(message.content.charAt(message.content.length-1)))) && message.author.bot === false) {
      message.delete();
      message.channel.send("⛔Nachrichten in <#724535385077579818> müssen mit **Anführungszeichen** beginnen oder enden!⛔").then(msg => setTimeout(function() { msg.delete() }, 10000));
      return;
    }
}})


// ROLLEN ZUTEILUNG

client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase() === "m") {
    /*msg.channel.send
      
      (`**automatische Rollenzuweisung:**\n<:emotelol:961377411969192006> League Of Legends\n<:emotecsgo:961437665566281768> Counter Strike: Global Offensive\n<:emotemc:963956314680217610> Minecraft`)*/
  await msg.channel.messages.fetch("1010914943949869056")
 // .then(message => message.edit(`**selbstständige Rollenzuweisung:**\n<:emotelol:961377411969192006> League Of Legends\n<:emotecsgo:961437665566281768> Counter Strike: Global Offensive\n<:sot:1010737597829611632> Sea of Thieves\n✏️ Skribbl.io/Gartic Phone\n<:pokemon:974283332642803712> Pokémon`))
  .then(message => message.react("<:pokemon:974283332642803712>"))
    
  }
})

//
//'✏️'
//<:emotecsgo:961437665566281768>
//<:sot:1010737597829611632>
//<:emotelol:961377411969192006>
//<:pokemon:974283332642803712>

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
    }
  }

let player = reaction.message.guild.members.cache.find(member => member.id === user.id)

const rollenGive = (rolleEmote, rolleID) => {
  if (reaction.message.id === "1010914943949869056" && user.bot === false && reaction.emoji.name === rolleEmote) {
           player.roles.add(rolleID)
}}

rollenGive("emotelol", "705132213070463036")
rollenGive("emotecsgo", "900092444333473813")
rollenGive("emotemc", "777130913494335498")
rollenGive('✏️', "656941146269810707")
rollenGive('pokemon', "546061416407367700")
rollenGive('sot', "988210307245694977")


});

client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
    }
  }

let player = reaction.message.guild.members.cache.find(member => member.id === user.id)
  
const rollenTake = (rolleEmote, rolleID) => {
  if (reaction.message.id === "1010914943949869056" && user.bot === false &&             reaction.emoji.name === rolleEmote) {
           player.roles.remove(rolleID)
}}
  
rollenTake("emotelol", "705132213070463036")
rollenTake("emotecsgo", "900092444333473813")
rollenTake("emotemc", "777130913494335498")
rollenTake('✏️', "656941146269810707")
rollenTake('pokemon', "546061416407367700")
rollenTake('sot', "988210307245694977")

});

// .im IMAGE SEACHER

const CSEID = process.env.CSEIDD
const GSAPI = process.env.GoogleSearchAPI
const googleSearch = new GoogleImages(CSEID, GSAPI);


const searchEmbed = (imageUrl, searchTerm) => {
  const googleSearchEmbed = {
  author: {
		name: `${searchTerm}`,
		icon_url: 'https://cdn.notsobot.com/brands/google-go.png',
	},
	color: "RANDOM",
	image: {
		url: imageUrl,
	},
}
return googleSearchEmbed    
};

const searchFailEmbed = (searchTerm) => {
  const googleSearchFailEmbed = {
  title: "❗FEHLER❗",
  description: `Es wurden keine mit deiner Suchanfrage **${searchTerm}** übereinstimmenden Dokumente gefunden oder das Dateiformat ist nicht lesbar.`,
  author: {
		name: `${searchTerm}`,
		icon_url: 'https://cdn.notsobot.com/brands/google-go.png',
	},
	color: "RANDOM",

}
return googleSearchFailEmbed    
};



client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase().startsWith(".im ")) {

const imageButtons = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton()
			.setCustomId('gobackPage')
			.setLabel('◁')
			.setStyle('SECONDARY')
      .setDisabled(true))
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('skipPage')
			.setLabel('▷')
			.setStyle('SECONDARY')
      .setDisabled(false))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('delete')
			.setLabel('✖')
			.setStyle('DANGER'))

const imageObj = {
      page: 0,
      searchTerm: 0,
      images: 0,
    }

   
    imageObj.searchTerm = msg.content.slice(4)
 
await googleSearch.search(imageObj.searchTerm)
    .then(imagesRaw => {

    let images = imagesRaw.filter(image => !image.url.startsWith("x-raw-image"))
    imageObj.images = images

if (images[imageObj.page] === undefined) {
    msg.reply({ embeds: [searchFailEmbed(imageObj.searchTerm)], allowedMentions: {repliedUser: false}})
    return
  }

if (images[imageObj.page] !== undefined) {

    msg.reply({ embeds: [searchEmbed(images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false}})
    .then(msg => {
      
      const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000});
      collector.on('collect', async i => {
	          if (i.customId === "gobackPage" && i.user.id === msg.mentions.repliedUser.id) {
                    if (imageObj.page === 1) {
                        imageButtons.components[0].setDisabled(true);
                    }
                    if (imageButtons.components[1].disabled === true) {
                        imageButtons.components[1].setDisabled(false);
                    }
                    
                    --imageObj.page
                    i.deferUpdate()
                    await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                    
            } else if (i.customId === "skipPage" && i.user.id === msg.mentions.repliedUser.id) {
                  if (imageObj.page >= 0) {
                        imageButtons.components[0].setDisabled(false);
                    }
                    if (imageObj.images[imageObj.page + 2] === undefined) {
                        imageButtons.components[1].setDisabled(true);
                    }
                  ++imageObj.page
                    i.deferUpdate()
                    await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [imageButtons], allowedMentions: {repliedUser: false} })
                    
            }  else if (i.user.id === msg.mentions.repliedUser.id) {
                  await msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [], allowedMentions: {repliedUser: false}})
                  collector.stop()
                
                }
      })
    collector.on('end', collected => {
	    msg.edit({ embeds: [searchEmbed(imageObj.images[imageObj.page].url, imageObj.searchTerm)], components: [], allowedMentions: {repliedUser: false}});
    });
})}})}})

// yui reminder
/*
client.on("ready", async () => {
  setInterval(function() {
    try {
  let channel1 = client.channels.cache.get("684055460302946320")
  let yuiMessages = []
  let playerWithRoleArray = channel1.guild.roles.cache.get('644927085915144222').members.map(m=>m.user.id)
  
const eachPlayerCheck = playerWithReminderRoleId => {
  
  const remindMessageContent = `❗<@${playerWithReminderRoleId}> **yui daily** ist wieder möglich.❗`
  channel1.messages.fetch({ limit: 100 })
    .then(messages => {
        messages.forEach(message => yuiMessages.push(message))
        let yuiDailyMessages = yuiMessages.filter(message => message.content.toLowerCase() === "yui daily")
        let lastYuiDailyPaul = yuiDailyMessages.find(message => message.author.id === playerWithReminderRoleId)
        let yuiConfirm = yuiMessages[yuiMessages.indexOf(lastYuiDailyPaul)-1] 
        let lastBotReminder = yuiMessages.find(message => message.content === remindMessageContent)
        const reminderFkn = () => {
          const user1 = client.users.cache.get(playerWithReminderRoleId)
          const memberHasYuiRole = channel1.guild.members.fetch(user1.id).then(m => {return m._roles.includes("644927085915144222")})
          return memberHasYuiRole;
        }
        const hasRoleBol = reminderFkn()
        let returnArray1 = [hasRoleBol, lastYuiDailyPaul, yuiDailyMessages, lastBotReminder, yuiConfirm]
        return returnArray1
        })
    .then(messages => {
      let yuiConfirm = messages[4]
      let lastBotReminder = messages[3]
      let yuiDailyMessages = messages[2]
      let lastYuiDailyPaul = messages[1]
      let hasRoleBol = messages[0]
      let noBotMsgDelete = false

if (lastBotReminder === undefined) {
  lastBotReminder = lastYuiDailyPaul
}

    if (lastYuiDailyPaul !== undefined) {
      if(hasRoleBol && lastYuiDailyPaul.createdTimestamp < Date.now() - 43200*1000 && lastYuiDailyPaul.createdTimestamp >= lastBotReminder.createdTimestamp/* && yuiConfirm.author.id === "280497242714931202"*/
 /*       channel1.send(remindMessageContent)
      }}         
      })
}


  playerWithRoleArray.forEach(playerId => eachPlayerCheck(playerId))

      
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
    }
}, 300 * 1000);
})

client.on("messageCreate", async message => {
  if (message.content.toLowerCase() === "#reminder") {
      const reminderFkn = () => {
          const user1 = client.users.cache.get(message.author.id)
          const memberHasYuiRole = message.guild.members.fetch(user1.id).then(m => {return m._roles.includes("644927085915144222")})
          return memberHasYuiRole;
        }
        const hasRoleBol = await reminderFkn()
    if (hasRoleBol === true) {
      message.channel.send({ content: "🔔Benachrichtigung bei wieder ausführbaren `yui daily`-Command momentan **EIN📳**\n\n<#996822129288958102>-Channel wird momentan **angezeigt**.\n\nEintellung ändern:", components: [buttons.reminderOn] }) .then(msg => {
        setTimeout(function() {
        msg.delete()
      }, 15*1000); 
      })

    } else if (hasRoleBol !== true) {
      message.channel.send({ content: "🔕Benachrichtigung bei wieder ausführbaren `yui daily`-Command momentan **AUS📴** \n\n<#996822129288958102>-Channel wird momentan **ausgeblendet**.\n\nEintellung ändern:", components: [buttons.reminderOff] }) .then(msg => {
        setTimeout(function() {
        msg.delete()
      }, 15*1000); 
      })
    }
  }
})

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === "on") {
      interaction.member.roles.add("644927085915144222")
      interaction.deferUpdate();

  } else if (interaction.customId === "off") {
      interaction.member.roles.remove("644927085915144222")
      interaction.deferUpdate()
  } }})  */                                                                            
/*
  _______ _        _______           _______         
 |__   __(_)      |__   __|         |__   __|        
    | |   _  ___     | | __ _  ___     | | ___   ___ 
    | |  | |/ __|    | |/ _` |/ __|    | |/ _ \ / _ \
    | |  | | (__     | | (_| | (__     | | (_) |  __/
    |_|  |_|\___|    |_|\__,_|\___|    |_|\___/ \___|
*/                                                 
// TTT LEADERBOARD

client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase() === "#ttt leaderboard") {

    const playerName = {
      list: [],
    }
      
    const playerElo = require("./schemas/elo.js")
    let userData = await playerElo.find().sort({win: -1})

    for (let i = 0; i < 5; i += 1) {
//SIMON MAIN ACC DODGE
        await msg.guild.members.fetch(userData[i].id) .then(user => {
          playerName.list.push(user.user.username)})
        }
      


  const leaderboardTTT = () => {
    const leaderboard = new discord.MessageEmbed()
    	.setColor('#94078C')
    	.setTitle('Leaderboard')
    	.setAuthor({ name: 'Banura | TIC TAC TOE', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    	.addFields(
    		{ name: `🥇 - ${playerName.list[0]}`, value: `> ${userData[0].win} Wins` },
        { name: `🥈 - ${playerName.list[1]}`, value: `> ${userData[1].win} Wins` },
        { name: `🥉 - ${playerName.list[2]}`, value: `> ${userData[2].win} Wins` },
        { name: `#4 - ${playerName.list[3]}`, value: `> ${userData[3].win} Wins` },
        { name: `#5 - ${playerName.list[4]}`, value: `> ${userData[4].win} Wins` },
    	)
    	.setTimestamp()
    	.setFooter({ text: "🕓" })
        
  return leaderboard
  }

    await msg.channel.send({ embeds: [leaderboardTTT()] })
  }})


// TTT PROILE

client.on("messageCreate", async message => {
  if (message.content.toLowerCase().startsWith("#ttt profile")) {

    const playerTTTStats = {
      wins: undefined,
      loses: undefined,
      games: undefined,
      user: message.author
    }

    if (message.content.includes("@") && message.mentions.users !== undefined) {
      playerTTTStats.user = message.mentions.users.at(0)
    }
    

    const playerElo = require("./schemas/elo.js")
    const mongoTTTProfile = async (player1or2, playerStats) => {
     let userData = await playerElo.findOne({_id : player1or2.id});
       if (!userData) {
         const createdData = new playerElo({
          _id : player1or2.id,
          name: player1or2.username,
          win : 0,
          lose : 0,
          games: 0,
       })
       await createdData.save().catch(e => console.log(e)) .then(
       await playerElo.findOne({_id : player1or2.id})) .then(userDataNew => {
        playerStats.wins = userDataNew.win
        playerStats.losses = userDataNew.lose
        playerStats.games = userDataNew.games 
       })
       return;
                                  
       } else if (userData) {
        userData = await playerElo.findOne({_id : player1or2.id});

         playerStats.wins = userData.win
         playerStats.losses = userData.lose
         playerStats.games = userData.games
           }
        return;
      }
    
   await mongoTTTProfile(playerTTTStats.user, playerTTTStats)
   let userRankData = await playerElo.find().sort({win: -1})
   let userRank = userRankData.findIndex(object => {return object.id === playerTTTStats.user.id})

    
  const createEmbedTTTProfile = (message) => {
    const embedTTTProfile = new discord.MessageEmbed()
        .setColor("#94078C")
        .setTitle(`${playerTTTStats.user.username}`)
        .setThumbnail(playerTTTStats.user.displayAvatarURL())
        .setAuthor({ name: 'Banura | TIC TAC TOE', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
        .addFields(
          //{ name: '\u200B', value: '\u200B' },
          { name: '🏆 Wins', value: "```" + `${playerTTTStats.wins}` + "```", inline: true },
          { name: '💀 Losses', value: "```" + `${playerTTTStats.losses}` + "```", inline: true },
          { name: '⚖️ Draws', value: "```" + `${playerTTTStats.games - (playerTTTStats.wins + playerTTTStats.losses)}` + "```", inline: true },
          { name: '🎮 Games', value: "```" + `${playerTTTStats.games}` + "```", inline: true },
          { name: '🏅 Winrate', value: "```" + `${Math.floor(playerTTTStats.wins / ((playerTTTStats.wins + playerTTTStats.losses) * 0.01))}` + "%```", inline: true },
          { name: '📜 Rank', value: "```" + `#${userRank + 1}` +"```", inline: true },
        )
        .setTimestamp()
        .setFooter({ text: "🕓" })
      return embedTTTProfile
  }
  message.channel.send({ embeds: [createEmbedTTTProfile(message)] })
  }
})

//EVENT GAME

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase().startsWith("#ttt") && !msg.content.toLowerCase().includes("#ttt profile") && !msg.content.toLowerCase().includes("#ttt leaderboard") && msg.mentions.users.at(0) !== undefined) {
    //Embeds

const createTTT = (message, player1username, player2username, status) => {

  let randomTTTThumbnail
  const randomNum = Math.floor(Math.random() * 5)

  switch (randomNum) {
    case 0: randomTTTThumbnail = "https://cdn.discordapp.com/attachments/951243124489990225/978868536313266176/Screenshot_2022-05-25_054432.png"; break;
    case 1: randomTTTThumbnail = "https://cdn.discordapp.com/attachments/951243124489990225/978868536673980436/Screenshot_2022-05-25_054127.png"; break;
    case 2: randomTTTThumbnail = "https://cdn.discordapp.com/attachments/951243124489990225/978868536925646918/tttimage.png"; break;
    case 3: randomTTTThumbnail = "https://cdn.discordapp.com/attachments/951243124489990225/978868537139531806/Screenshot_2022-05-25_054648.png"; break;
    case 4: randomTTTThumbnail = "https://cdn.discordapp.com/attachments/951243124489990225/978868537374416896/Screenshot_2022-05-25_054540.png"; break;
  }

  const embedTTT = new discord.MessageEmbed()
    .setColor("#94078C")
    .setThumbnail(randomTTTThumbnail)
    .setTitle("TIC TAC TOE")
    .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .setDescription(`\n**${player1username}** fordert **${player2username}** heraus!\n\n\n${status}`)
    .addFields(
      { name: '\u200B', value: '\u200B' },
    )
    .setTimestamp()
    .setFooter({text: "#ttt profile | #ttt leaderboard  • " + "🕓" })
  return embedTTT
}

const createTTTError = (message) => {
  const embedTTT = new discord.MessageEmbed()
    .setColor("#94078C")
    .setThumbnail('https://cdn.discordapp.com/attachments/951243124489990225/978868536313266176/Screenshot_2022-05-25_054432.png')
    .setTitle("TIC TAC TOE")
    .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .addFields(
		{ name: `⛔ERROR⛔`,value: "Gegenspieler muss __gepingt__ werden! \n\n**korrekte Schreibweise:**\n`#ttt @[Gegenspieler]`"},)
    .setTimestamp()
    .setFooter({text: "🕓" })
  return embedTTT
}

const createTTTWin = (message, player1username, player2username, winner, loser, medailleWin, medailleLos, player1wins, player2wins, player1loses, player2loses, player1games, player2games) => {
  const embedTTT = new discord.MessageEmbed()
    .setColor("#94078C")
    .setAuthor({ name: 'TIC TAC TOE', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .addFields(
		{ name: `${player1username} 🆚 ${player2username}`,value: `${grid.p1}${grid.p2}${grid.p3}\n${grid.p4}${grid.p5}${grid.p6}\n${grid.p7}${grid.p8}${grid.p9}\n`},
    { name: `Endstand:`,value: `**${winner}** gewinnt gegen **${loser}**!\n`},
   // { name: `Statistik:`,value: `**${winner}**:  🏆${player1wins} | 💀${player1loses} | 🎮${player1games}\n**${loser}**:  🏆${player2wins} | 💀${player2loses} | 🎮${player2games}`},
    { name: `${medailleWin} ${player1username}`, value: "```" + `🏆 | Wins: ${player1wins}\n💀 | Losses: ${player1loses}\n⚖️ | Draws: ${player1games - (player1wins + player1loses)}\n🎮 | Games played: ${player1games}` + "```", inline: true },
    { name: `${medailleLos} ${player2username}`, value: "```" + `🏆 | Wins: ${player2wins}\n💀 | Losses: ${player2loses}\n⚖️ | Draws: ${player2games - (player2wins + player2loses)}\n🎮 | Games played: ${player2games}` + "```", inline: true },
    )
    .setFooter({text: `❎:  ${player1username}\n🅾️:  ${player2username}\n\n#ttt profile | #ttt leaderboard  • ` + "🕓"  })
  //.setFooter({text: "#ttt profile | #ttt leaderboard  • ` + "🕓" })
    .setTimestamp()
  return embedTTT
}

const createTTTDraw = (message, player1username, player2username, medailleWin, medailleLos, player1wins, player2wins, player1loses, player2loses, player1games, player2games) => {
  const embedTTT = new discord.MessageEmbed()
    .setColor("#94078C")
    .setAuthor({ name: 'TIC TAC TOE', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .addFields(
		{ name: `${player1username} 🆚 ${player2username}`,value: `${grid.p1}${grid.p2}${grid.p3}\n${grid.p4}${grid.p5}${grid.p6}\n${grid.p7}${grid.p8}${grid.p9}\n`},
    { name: `Endstand:`,value: `🤝Unentschieden!\n`},
    { name: `${medailleWin} ${player1username}`, value: "```" + `🏆 | Wins: ${player1wins}\n💀 | Losses: ${player1loses}\n⚖️ | Draws: ${player1games - (player1wins + player1loses)}\n🎮 | Games played: ${player1games}` + "```", inline: true },
    { name: `${medailleLos} ${player2username}`, value: "```" + `🏆 | Wins: ${player2wins}\n💀 | Losses: ${player2loses}\n⚖️ | Draws: ${player2games - (player2wins + player2loses)}\n🎮 | Games played: ${player2games}` + "```", inline: true },
    )
    .setFooter({text: `❎:  ${player1username}\n🅾️:  ${player2username}\n\n#ttt profile | #ttt leaderboard`})
  return embedTTT
}
    
//Grid Object

let grid = {
  p1: "⬜",
  p2: "⬜",
  p3: "⬜",
  p4: "⬜",
  p5: "⬜",
  p6: "⬜",
  p7: "⬜",
  p8: "⬜",
  p9: "⬜",
}

const gridEmpty = new discord.MessageAttachment('./ttt/gridEmpty.png');
const cross1 = new discord.MessageAttachment('./ttt/gridEmpty.png');

const createTTTGame = (message, player1username, player2username) => {
  const embedTTT = new discord.MessageEmbed()
    .setColor("#94078C")
    .setAuthor({ name: 'TIC TAC TOE', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png'})
    .addFields(
		{ name: `${player1username} 🆚 ${player2username}`,value: `${grid.p1}${grid.p2}${grid.p3}\n${grid.p4}${grid.p5}${grid.p6}\n${grid.p7}${grid.p8}${grid.p9}\n`},
    )
    .setFooter({text: `❎: ${player1username}\n🅾️: ${player2username}` })
  return embedTTT
}


//Buttons-Lobby

const challangeRequest = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('accept')
			.setLabel('✔')
			.setStyle('SUCCESS')
      .setDisabled(false))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('decline')
			.setLabel('✖')
			.setStyle('DANGER'))

//Buttons-Game

const blauRow1 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('blau1')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau2')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau3')
			.setLabel('☓')
			.setStyle('SUCCESS'))

const blauRow2 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('blau4')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau5')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau6')
			.setLabel('☓')
			.setStyle('SUCCESS'))

const blauRow3 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('blau7')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau8')
			.setLabel('☓')
			.setStyle('SUCCESS'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('blau9')
			.setLabel('☓')
			.setStyle('SUCCESS'))

const rotRow1 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('rot1')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot2')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot3')
			.setLabel('◯')
			.setStyle('DANGER'))

const rotRow2 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('rot4')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot5')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot6')
			.setLabel('◯')
			.setStyle('DANGER'))

const rotRow3 = new discord.MessageActionRow()
	  .addComponents(
		new discord.MessageButton() 
			.setCustomId('rot7')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot8')
			.setLabel('◯')
			.setStyle('DANGER'))
    .addComponents(
		new discord.MessageButton()
			.setCustomId('rot9')
			.setLabel('◯')
			.setStyle('DANGER'))

// SCHEMAS

const playerElo = require("./schemas/elo.js")
    
// CODE
    
  player1 = msg.author
  player2 = msg.mentions.users.at(0)
  const player1Member = msg.guild.members.fetch(player1.id)

  if (player2 === undefined && !msg.content.toLowerCase().includes("#ttt profile") && !msg.content.toLowerCase().includes("#ttt leaderboard")) {
    //msg.channel.send({ embeds: [createTTTError(msg)]})
  } else if (player2 !== undefined && !msg.content.toLowerCase().includes("#ttt profile" && !msg.content.toLowerCase().includes("#ttt leaderboard"))) {
    
  msg.channel.send({ embeds: [createTTT(msg, player1.username, player2.username, "__Herausforderung annehmen?__  ⌛")], components: [challangeRequest] })
    .then(msg => {
      
  const collectorTTT = msg.createMessageComponentCollector({ componentType: 'BUTTON'/*, time: 5 * 60 * 1000*/});
      collectorTTT.on('collect', async i => {
        
	          if (i.customId === "accept" && i.user.id === player2.id) {
                    
                    i.deferUpdate()
                    await msg.edit({ embeds: [createTTT(msg, player1.username, player2.username, "__Herausforderung akzeptiert.__  🟢")], components: [] }) 
                    //Loading Screen
                    setTimeout(function() {
                        msg.edit({ embeds: [createTTT(msg, player1.username, player2.username, "Spiel lädt.\n🟥🟥🟥")]})
                    }, 2.5 * 1000);
              
                    for (let i = 1 ; i < 5; i += 1) {
                      let loadingState = ""
                      let finishedState = []
                      switch (i) {
                        case 1: loadingState = createTTT(msg, player1.username, player2.username, "Spiel lädt..\n🟩🟥🟥"); break;
                        case 2: loadingState = createTTT(msg, player1.username, player2.username, "Spiel lädt...\n🟩🟩🟥"); break;
                        case 3: loadingState = createTTT(msg, player1.username, player2.username, "Spiel lädt.\n🟩🟩🟩"); break;
                        case 4: loadingState = createTTTGame(msg, player1.username, player2.username)
                                finishedState = [blauRow1, blauRow2, blauRow3]; break;
                      }
                      
                        await setTimeout(async function() {
                            await msg.edit({ embeds: [loadingState], components: finishedState })
                        }, ((i * 1.0) + 2.5) * 1000)
                      }

    	                // Game Collector
              
                      const collectorTTTGame = msg.createMessageComponentCollector({ componentType: 'BUTTON'});
                          collectorTTTGame.on('collect', async e => {

                      const winConfirm = symbol => {
                            if((grid.p1 === `${symbol}` && grid.p2 === `${symbol}` && grid.p3 === `${symbol}`) || (grid.p4 === `${symbol}` && grid.p5 === `${symbol}` && grid.p6 === `${symbol}`) || (grid.p7 === `${symbol}` && grid.p8 === `${symbol}` && grid.p9 === `${symbol}`) || (grid.p1 === `${symbol}` && grid.p4 === `${symbol}` && grid.p7 === `${symbol}`) || (grid.p2 === `${symbol}` && grid.p5 === `${symbol}` && grid.p8 === `${symbol}`) || (grid.p3 === `${symbol}` && grid.p6 === `${symbol}` && grid.p9 === `${symbol}`) || (grid.p1 === `${symbol}` && grid.p5 === `${symbol}` && grid.p9 === `${symbol}`) || (grid.p3 === `${symbol}` && grid.p5 === `${symbol}` && grid.p7 === `${symbol}`)) {
                              return true
                            }
                            return
                          }

                      const player1Stats = {
                        wins: undefined,
                        loses: undefined,
                        games: undefined,
                      }

                      const player2Stats = {
                        wins: undefined,
                        loses: undefined,
                        games: undefined,
                      }

                      const mongoEloNew = async (player1or2, playerStats, wins, losses) => {
                        let userData = await playerElo.findOne({_id : player1or2.id});
                          if (userData === null) {
                            const createdData = new playerElo({
                              _id : player1or2.id,
                              name: player1or2.username,
                              win : 0,
                              lose : 0,
                              games: 0,
                            })
                            
                            await createdData.save().catch(e => console.log(e))
                            return;
                              
                            }}
                          
                      const mongoElo = async (player1or2, playerStats, wins, losses)  => {
                        let userData = await playerElo.findOne({_id : player1or2.id});
                              await userData.updateOne({ $inc: {win: wins, games: 1, lose: losses}})
                              userData = await playerElo.findOne({_id : player1or2.id});

                              playerStats.wins = userData.win
                              playerStats.loses = userData.lose
                              playerStats.games = userData.games

                              return;
                            }

                            //const createTTTWin = (message, player1username, player2username, winner, loser, medailleWin, medailleLos, player1wins, player2wins, player1loses, player2loses, player1games, player2games)
                          const buttonClick = async (rowGreen, rowRed, pos, components) => {
                            e.deferUpdate()
                            rowGreen.components[pos].setDisabled(true);
                            rowRed.components[pos].setDisabled(true);
                            // Win für X Player1
                            if (winConfirm("❎")) {
                              await mongoEloNew(player1, player1Stats, 1, 0).then(
                              await mongoElo(player1, player1Stats, 1, 0)).then(
                              await mongoEloNew(player2, player2Stats, 0, 1)).then(
                              await mongoElo(player2, player2Stats, 0, 1)).then(
                               msg.edit({ embeds: [createTTTWin(msg, player1.username, player2.username, player1.username, player2.username, "🏆", "💀", player1Stats.wins, player2Stats.wins, player1Stats.loses, player2Stats.loses, player1Stats.games, player2Stats.games)], components: []}))
                            } 
                            // Win für O Player2
                            else if (winConfirm("🅾️")) {
                              await mongoEloNew(player1, player1Stats, 0, 1).then(
                              await mongoElo(player1, player1Stats, 0, 1)).then(
                              await mongoEloNew(player2, player2Stats, 1, 0)).then(
                              await mongoElo(player2, player2Stats, 1, 0)).then(
                              msg.edit({ embeds: [createTTTWin(msg, player1.username, player2.username, player2.username, player1.username, "💀", "🏆", player1Stats.wins, player2Stats.wins, player1Stats.loses, player2Stats.loses, player1Stats.games, player2Stats.games)], components: []}))
                            } 
                            // DRAW
                            else if ((blauRow1.components[0].disabled && blauRow1.components[1].disabled && blauRow1.components[2].disabled && blauRow2.components[0].disabled && blauRow2.components[1].disabled && blauRow2.components[2].disabled && blauRow3.components[0].disabled && blauRow3.components[1].disabled && blauRow3.components[2].disabled)) {
                              await mongoEloNew(player1, player1Stats, 0, 0).then(
                              await mongoElo(player1, player1Stats, 0, 0)).then(
                              await mongoEloNew(player2, player2Stats, 0, 0)).then(
                              await mongoElo(player2, player2Stats, 0, 0)).then(
                              msg.edit({ embeds: [createTTTDraw(msg, player1.username, player2.username, "⚖️", "⚖️", player1Stats.wins, player2Stats.wins, player1Stats.loses, player2Stats.loses, player1Stats.games, player2Stats.games)], components: []}))
                            } 
                            // GAME CONTINUES
                            else {
                              msg.edit({ embeds: [createTTTGame(msg, player1.username, player2.username)], components: components})
                            }
                          }

                            if (e.user.id === player1.id) {
                              switch (e.customId) {
                                case 'blau1':
                                  grid.p1 = "❎"; buttonClick(blauRow1, rotRow1, 0, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau2':
                                  grid.p2 = "❎"; buttonClick(blauRow1, rotRow1, 1, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau3':
                                  grid.p3 = "❎"; buttonClick(blauRow1, rotRow1, 2, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau4':
                                  grid.p4 = "❎"; buttonClick(blauRow2, rotRow2, 0, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau5':
                                  grid.p5 = "❎"; buttonClick(blauRow2, rotRow2, 1, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau6':
                                  grid.p6 = "❎"; buttonClick(blauRow2, rotRow2, 2, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau7':
                                  grid.p7 = "❎"; buttonClick(blauRow3, rotRow3, 0, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau8':
                                  grid.p8 = "❎"; buttonClick(blauRow3, rotRow3, 1, [rotRow1, rotRow2, rotRow3]);
                                  break;
                                case 'blau9':
                                  grid.p9 = "❎"; buttonClick(blauRow3, rotRow3, 2, [rotRow1, rotRow2, rotRow3]);
                                  break;
                            }} 
                            
                            if (e.user.id === player2.id) {
                              switch(e.customId) {
                                case 'rot1':
                                  grid.p1 = "🅾️"; buttonClick(blauRow1, rotRow1, 0, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot2':
                                  grid.p2 = "🅾️"; buttonClick(blauRow1, rotRow1, 1, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot3':
                                  grid.p3 = "🅾️"; buttonClick(blauRow1, rotRow1, 2, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot4':
                                  grid.p4 = "🅾️"; buttonClick(blauRow2, rotRow2, 0, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot5':
                                  grid.p5 = "🅾️"; buttonClick(blauRow2, rotRow2, 1, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot6':
                                  grid.p6 = "🅾️"; buttonClick(blauRow2, rotRow2, 2, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot7':
                                  grid.p7 = "🅾️"; buttonClick(blauRow3, rotRow3, 0, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot8':
                                  grid.p8 = "🅾️"; buttonClick(blauRow3, rotRow3, 1, [blauRow1, blauRow2, blauRow3]);
                                  break;
                                case 'rot9':
                                  grid.p9 = "🅾️"; buttonClick(blauRow3, rotRow3, 2, [blauRow1, blauRow2, blauRow3]);
                                  break;
                            }
                          }})
              
                          collectorTTTGame.on('end', collected => {
                      	      msg.edit({ embeds: [createTTT(msg, player1.username, player2.username, "__Spiel abgelaufen.__  🔴")], components: [], });
                          });
              
                      } else if (i.customId === "decline" && i.user.id === player2.id) {
                    i.deferUpdate()
                    await msg.edit({ embeds: [createTTT(msg, player1.username, player2.username, "__Herausforderung abgelehnt.__  🔴")], components: [] })
                    
            }
      })
    collectorTTT.on('end', collected => {
	    msg.edit({ embeds: [createTTT(msg, player1.username, player2.username, "__Spiel abgelaufen.__  🔴")], components: [], });
    });
    })}
  }
})

// .   ,                 ,-.      .   
//|\ /|         o       |  )     |   
//| V | . . ,-. . ,-.   |-<  ,-. |-  
//|   | | | `-. | |     |  ) | | |   
//'   ' `-` `-' ' `-'   `-'  `-' `-' 

const settings = {
  prefix: '#',
  token: 'YourBotTokenHere'
};

const messageObj = {
id: undefined,
username: [],
};

const embedPlayCreator = (songStats, username, length) => {
const musicEmbed = new discord.MessageEmbed()
.setColor("#94078C")
.setTitle(songStats.name)
.setAuthor({ name: '🎶 aktuelle Wiedergabe:'})
.setThumbnail(songStats.thumbnail)
.addFields(
  { name: 'Autor*in:', value: `\`${songStats.author}\``, inline: true },
  { name: 'Länge:', value: `\`${songStats.duration}\``, inline: true },
  { name: 'In Warteschlange:', value: `\`${length - 1}\``, inline: true },
)
.setTimestamp()
.setFooter({ text: `Angefragt von ${username}`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' });

return musicEmbed
}

const embedAddCreator = (songStats, username) => {
const musicEmbed = new discord.MessageEmbed()
.setColor("#94078C")
.setTitle(songStats.name)
.setAuthor({ name: '➕ zur Warteschlange hinzugefügt:'})
.setThumbnail(songStats.thumbnail)
.setTimestamp()
.setFooter({ text: `Angefragt von ${username}`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' });

return musicEmbed
}
const { Player } = require("discord-music-player");

const endEmbed = new discord.MessageEmbed()
.setColor("#94078C")
.setTitle("Zurzeit wird kein Lied abgespielt.")
.setAuthor({ name: '🎶 aktuelle Wiedergabe:'})
.setThumbnail("https://it-talents.de/tag/it-stipendium-2021/")
.setTimestamp()
.setFooter({ text: `Banura`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' });

const player = new Player(client, {
  leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;

const { RepeatMode } = require('discord-music-player');

client.on('messageCreate', async (message) => {
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let guildQueue = client.player.getQueue(message.guild.id);

  if(command === 'play' && message.member.voice.channel !== null) {
      let queue = client.player.createQueue(message.guild.id);
      await queue.join(message.member.voice.channel);
      let song = await queue.play(args.join(' ')).catch(err => {
          console.log(err);
          if(!guildQueue)
              queue.stop();
      });
    let stats = player.getQueue(message.guild.id)
    if (stats.songs.length < 2) {
      await message.channel.send({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [playerButtonsPause] }) .then(async msg => {
        messageObj.id = await msg
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'});
        collector.on('collect', async i => {
          let guildQueue = client.player.getQueue(message.guild.id);
            if (i.customId === "stop") {
              await i.deferUpdate()
              messageObj.id = await i.editReply({ embeds: [endEmbed], components: [] });
              await guildQueue.stop();
              return
            }
            if (i.customId === "skip") {
              await i.deferUpdate()
              if(stats.songs.length < 2) {
                messageObj.id = await i.editReply({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [] });
              } else if (stats.songs.length >= 2) {
                messageObj.id = await i.editReply({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [playerButtonsPause] });
              }
              await guildQueue.skip();
              return
            }
            if (i.customId === "resume") {
              await i.deferUpdate()
              messageObj.id = await i.editReply({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [playerButtonsPause] });
              await guildQueue.setPaused(false);
              return
            }
            if (i.customId === "pause") {
              await i.deferUpdate()
              messageObj.id = await i.editReply({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [playerButtonsResume] });
              await guildQueue.setPaused(true);
              return
            }
      })})
    } else if (stats.songs.length >= 2) {
      await messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], message.author.username, stats.songs.length)], components: [playerButtonsPause] }))
      message.channel.send({ embeds: [embedAddCreator(stats.songs[stats.songs.length - 1], message.author.username)] })
      messageObj.username.push(message.author.username)

    }} else if (command === 'play' && message.member.voice.channel === null) {
      message.channel.send("geh doch evtl in an voice channel du kasper")
    }

  if(command === 'playlist') {
      let queue = client.player.createQueue(message.guild.id);
      await queue.join(message.member.voice.channel);
      let song = await queue.playlist(args.join(' ')).catch(err => {
          console.log(err);
          if(!guildQueue)
              queue.stop();
      });
  }

  if(command === 'skip') {
      guildQueue.skip();
  }

  if(command === 'stop') {
      guildQueue.stop();
  }

  if(command === 'removeLoop') {
      guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
  }

  if(command === 'toggleLoop') {
      guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
  }

  if(command === 'toggleQueueLoop') {
      guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
  }

  if(command === 'setVolume') {
      guildQueue.setVolume(parseInt(args[0]));
  }

  if(command === 'seek') {
      guildQueue.seek(parseInt(args[0]) * 1000);
  }

  if(command === 'clearQueue') {
      guildQueue.clearQueue();
  }

  if(command === 'shuffle') {
      guildQueue.shuffle();
  }

  if(command === 'getQueue') {
      console.log(guildQueue);
  }

  if(command === 'getVolume') {
      console.log(guildQueue.volume)
  }

  if(command === 'nowPlaying') {
      console.log(`Now playing: ${guildQueue.nowPlaying}`);
  }

  if(command === 'pause') {
      guildQueue.setPaused(true);
  }

  if(command === 'resume') {
      guildQueue.setPaused(false);
  }

  if(command === 'remove') {
      guildQueue.remove(parseInt(args[0]));
  }

  if(command === 'createProgressBar') {
      const ProgressBar = guildQueue.createProgressBar();
      
      // [======>              ][00:35/2:20]
      console.log(ProgressBar.prettier);
  }
})

client.player
  .on('songChanged', (queue, newSong, oldSong) => {
    let stats = player.getQueue(messageObj.id.guild.id)
    messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], messageObj.username[0], stats.songs.length)], components: [playerButtonsPause] }))
    messageObj.username.shift()
  })
  .on('queueEnd',  (queue) => {
    //let stats = player.getQueue(messageObj.id.guild.id)
    //messageObj.id.edit(({ embeds: [endEmbed], components: [] }))
  })

const playerButtonsPause = new discord.MessageActionRow()
.addComponents(
  new discord.MessageButton()
    .setCustomId('stop')
    .setLabel('STOP')
    .setStyle('DANGER'))
  .addComponents(
  new discord.MessageButton()
    .setCustomId('pause')
    .setLabel('PAUSE')
    .setStyle('SECONDARY'))
  .addComponents(
  new discord.MessageButton() 
    .setCustomId('skip')
    .setLabel('SKIP')
    .setStyle('SECONDARY'))
 //   .addComponents(
//	new discord.MessageButton()
//		.setCustomId('queue')
//		.setLabel('QUEUE')
//		.setStyle('SECONDARY'))

const playerButtonsResume = new discord.MessageActionRow()
    .addComponents(
      new discord.MessageButton()
        .setCustomId('stop')
        .setLabel('STOP')
        .setStyle('DANGER'))
      .addComponents(
      new discord.MessageButton()
        .setCustomId('resume')
        .setLabel('RESUME')
        .setStyle('SECONDARY'))
      .addComponents(
      new discord.MessageButton() 
        .setCustomId('skip')
        .setLabel('SKIP')
        .setStyle('SECONDARY'))
   //     .addComponents(
  //    new discord.MessageButton()
  //      .setCustomId('queue')
  //      .setLabel('QUEUE')
  //      .setStyle('SECONDARY'))

//  ____   ____     __                         __          
//  \   \ /   /____/  |_  ____   _____  __ ___/  |_  ____  
//   \   Y   /  _ \   __\/ __ \ /     \|  |  \   __\/ __ \ 
//    \     (  <_> )  | \  ___/|  Y Y  \  |  /|  | \  ___/ 
//     \___/ \____/|__|  \___  >__|_|  /____/ |__|  \___  >
//                           \/      \/                 \/ 

client.on("messageCreate", async msg => {

  if (msg.content.toLowerCase().startsWith("#votemute")) {
    
    const user = msg.guild.members.cache.get(msg.author.id)
    const channel = msg.guild.channels.cache.get(user.voice.channelId)
    const dateStart = new Date(msg.createdTimestamp)

    // Error Embeds
    const error_embed_fcn = (error_msg) => {

      const error_embed = new discord.MessageEmbed()
        .setColor("#94078C")
        .setTitle('⚠️Votemute - Fehler⚠️')
        .setAuthor({ name: 'Banura', iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' })
        .setDescription(error_msg)
        .setTimestamp()
        .setFooter({text: "🕓" })

      return error_embed

    }

    if (msg.mentions.members.at(0) === undefined)  {

      msg.channel.send({ embeds: [error_embed_fcn("Erfordert pingen von Nutzer, der gemutet werden soll.\n\nz.B. #votemute @Banura-Servicemitarbeiterin")] })
    
      return;

    }



    if (!channel)  {

      msg.channel.send({ embeds: [error_embed_fcn(`Sie müssen sich in einem **Talk** befinden um diesen Command ausführen zu können.`)] })
    
      return;

    }
    channel.members.size

    if (channel.members.size < 3)  {

      msg.channel.send({ embeds: [error_embed_fcn(`Um einen Abstimmung zu starten müssen mindestens 3 Nutzer*innen in ${channel} anwesend sein.`)] })
    
      return;

    }
    //Mute

    const votes = {
      pro: 0,
      con: 0,
      memberSize: channel.members.size - 1,
      lastBotMsg: undefined,
      editNotIncoming: true,
      namelist: "",
    }

    const mutedUser = msg.guild.members.cache.get(msg.mentions.users.at(0).id)
    const channel_members = []



    const mute_buttons = new discord.MessageActionRow()
      .addComponents(
        new discord.MessageButton()
          .setCustomId('mute_pro')
          .setLabel('🔇')
          .setStyle('PRIMARY'))
      .addComponents(
        new discord.MessageButton()
          .setCustomId('mute_con')
          .setLabel('🔊')
          .setStyle("PRIMARY"))
      .addComponents(
        new discord.MessageButton()
          .setCustomId('mute_users')
          .setLabel('🗳️')
          .setStyle('SECONDARY'))

    const mute_embed_fcn = (msg, status, votes_needed) => {
      const mute_embed = new discord.MessageEmbed()
        .setColor("#94078C")
        .setTitle(msg.mentions.members.at(0).user.username)
        .setAuthor({ name: `Votemute | ${channel.name}`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' })
        .setDescription(`Der Antrag wurde von **${msg.author.username}** erstellt. Innerhalb **5 Minuten** kann abgestimmt werden.`)
        .addFields(
          { name: 'Status', value: `${status}` },
          { name: 'Votes:', value: `🔇 **${votes.pro}**\n🔊 **${votes.con}**\n\n${votes.con + votes.pro}/${votes_needed}\n\nFür einen Mute werden **${votes_needed} 🔇-Stimmen** benötigt.` },
        )
        .setTimestamp()
        .setFooter({text: "🕓" })

      return mute_embed

    }

    const mute_end_embed_fcn = (msg, status, votes_needed) => {

      dateEnd = new Date(Date.now())

      const mute_embed = new discord.MessageEmbed()
        .setColor("#94078C")
        .setTitle(msg.mentions.members.at(0).user.username)
        .setAuthor({ name: `Votemute | ${channel.name}`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' })
        .setDescription(`Der Antrag wurde von **${msg.author.username}** erstellt. Von **${dateStart.getHours()}:${dateStart.getMinutes()}** bis **${dateEnd.getHours()}:${dateEnd.getMinutes()}** wurde agestimmt.`)
        .addFields(
          { name: 'Status', value: `${status}` },
          { name: 'Votes:', value: `🔇 **${votes.pro}**\n🔊 **${votes.con}**\n\n${votes.con + votes.pro}/${votes_needed}\n\nFür einen Mute wurden **${votes_needed} 🔇-Stimmen** benötigt.` },
        )
        .setTimestamp()
        .setFooter({text: "🕓" })

      return mute_embed

    }

    const namelist_embed_fcn = (msg, list) => {

      const mute_embed = new discord.MessageEmbed()
        .setColor("#94078C")
        .setTitle(msg.mentions.members.at(0).user.username)
        .setAuthor({ name: `Votemute | ${channel.name}`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' })
        .addFields(
          { name: 'Noch nicht Abgestimmt:', value: `${list}` },
        )
        .setTimestamp()
        .setFooter({text: "🕓" })

      return mute_embed

    }

    await channel.members.forEach((memberData) => {
      if (memberData.user.id !== mutedUser.user.id) {
        channel_members.push(memberData.user.id)
      }

      if (votes.namelist === undefined && memberData.user.id !== mutedUser.user.id) {
        votes.namelist = `${memberData.user.username}\n`
      } else if (memberData.user.id !== mutedUser.user.id) {
        votes.namelist = votes.namelist + `${memberData.user.username}\n`
      }
      
    });


    msg.channel.send({ embeds: [mute_embed_fcn(msg, "Voting im Gange.", votes.memberSize)], components: [mute_buttons]}).then(message => {
    const collectorVotemute = message.createMessageComponentCollector({ componentType: 'BUTTON'/*, time: 5 * 60 * 1000*/});
      collectorVotemute.on('collect', async i => {

      if (i.customId === "mute_pro") {

        if (votes.namelist.includes(i.user.username) && votes.editNotIncoming)  {

          votes.pro++
          votes.namelist = votes.namelist.replace(`${i.user.username}\n`, "")
          if (votes.pro === votes.memberSize) {

            mutedUser.roles.add("1030798705479139329")

            await i.update({ embeds: [mute_end_embed_fcn(msg, `Voting abgeschlossen. ${mutedUser} wurde **stummgeschalten**.`, votes.memberSize)], components: []})

            setTimeout(function () {mutedUser.roles.remove("1030798705479139329")}, 5 * 60 * 1000 )

          } else if (votes.pro + votes.con === votes.memberSize) {
            
            await i.update({ embeds: [mute_end_embed_fcn(msg, `Voting abgeschlossen. ${mutedUser} wurde **nicht stummgeschalten**.`, votes.memberSize)], components: []})

          } else {

            await i.update({ embeds: [mute_embed_fcn(msg, "Voting im Gange.", votes.memberSize)], components: [mute_buttons]})
          
          }

        } else if (i.user.id === mutedUser.user.id && votes.editNotIncoming) {

          await i.reply({ content: "Sie können nicht an dieser Abstimmung teilnehmen, da sich diese um Sie handelt.", ephemeral: true})
  
        } else if (channel_members.includes(i.user.id) && !votes.namelist.includes(i.user.username) && votes.editNotIncoming) {
  
          await i.reply({ content: "Sie haben bereits abgestimmt.", ephemeral: true})
  
        } else if (!votes.namelist.includes(i.user.username) && votes.editNotIncoming) {
  
          await i.reply({ content: "Sie waren zum Zeitpunkt des Beginns der Abstimmung nicht im Talk.", ephemeral: true})
  
        }
  
      } else if (i.customId === "mute_con") {

        if (votes.namelist.includes(i.user.username) && votes.editNotIncoming)  {

          votes.con++
          votes.namelist = votes.namelist.replace(`${i.user.username}\n`, "")

          if (votes.pro + votes.con === votes.memberSize) {
            
            await i.update({ embeds: [mute_end_embed_fcn(msg, `Voting abgeschlossen. ${mutedUser} wurde **nicht stummgeschalten**.`, votes.memberSize)], components: []})

          } else {

            await i.update({ embeds: [mute_embed_fcn(msg, "Voting im Gange.", votes.memberSize)], components: [mute_buttons]})
          
          }

        } else if (i.user.id === mutedUser.user.id && votes.editNotIncoming) {

          await i.reply({ content: "Sie können nicht an dieser Abstimmung teilnehmen, da sich diese um Sie handelt.", ephemeral: true})
  
        } else if (channel_members.includes(i.user.id) && !votes.namelist.includes(i.user.username) && votes.editNotIncoming) {
  
          await i.reply({ content: "Sie haben bereits abgestimmt.", ephemeral: true})
  
        } else if (!votes.namelist.includes(i.user.username) && votes.editNotIncoming) {
  
          await i.reply({ content: "Sie waren zum Zeitpunkt des Beginns der Abstimmung nicht im Talk.", ephemeral: true})
  
        }

      } else if (i.customId === "mute_users" && votes.editNotIncoming) {

        await i.reply({ embeds: [namelist_embed_fcn(msg, votes.namelist)], ephemeral: true})

      }

    })
      
    setTimeout(function () {
      
      votes.editNotIncoming = false

      if (!(votes.pro + votes.con >= votes.memberSize)) {
        message.edit({ embeds: [mute_end_embed_fcn(msg, `Voting abgelaufen. ${mutedUser} wurde **nicht stummgeschalten**.`, votes.memberSize)], components: []})
      }

    }, 5 * 60 * 1000  )

    })

    }
    
    })
// SERVER & LOGIN
const token = process.env.TOKEN
client.login(token)
