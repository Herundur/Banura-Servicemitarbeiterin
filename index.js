require("dotenv").config()
const discord = require("discord.js")
const youtube = require('youtube-random-video');
const random = require("something-random-on-discord").Random
const translate = require('@vitalets/google-translate-api');
const ytNotifs = require("youtube-notifs");
const fs = require("fs")
const GoogleImages = require('google-images');
//const axios = require("axios");
const { Player } = require("discord-music-player");
const mongoose = require("mongoose")
require('events').EventEmitter.defaultMaxListeners = 40;
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_SCHEDULED_EVENTS", "GUILD_PRESENCES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES"], 
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
})

// ____  _           _        ____                                          _     
/// ___|| | __ _ ___| |__    / ___|___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
//\___ \| |/ _` / __| '_ \  | |   / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
// ___) | | (_| \__ \ | | | | |__| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
//|____/|_|\__,_|___/_| |_|  \____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/
                                                                                
client.commands = new discord.Collection()

const commandFiles = fs.readdirSync("./Files/Slash Commands").filter(file => file.endsWith(".js"))

commandFiles.forEach(commandFile => {
    const command = require(`./Files/Slash Commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName)

  if(command) {

    try {
      await command.execute(interaction)
    } catch(error) {
      console.error(error)

      if(interaction.deferred || interaction.replied) {
        interaction.editReply("Fehler!")
      } else {
        interaction.reply("Fehler!")
      }
    }

  }
})

// __  __           _                _   _             
//|  \/  | ___   __| | ___ _ __ __ _| |_(_) ___  _ __  
//| |\/| |/ _ \ / _` |/ _ \ '__/ _` | __| |/ _ \| '_ \ 
//| |  | | (_) | (_| |  __/ | | (_| | |_| | (_) | | | |
//|_|  |_|\___/ \__,_|\___|_|  \__,_|\__|_|\___/|_| |_|

// STATUS
client.on("ready", async () => {
  const statusMongo = require('./Files/Moderation/status & mongo.js');
  statusMongo(client, mongoose)
})

// POKEBOT MSG DELETE
const pokemsgdelete = require('./Files/Moderation/Pokebot-msg-delete.js');
client.on("messageCreate", msg => {
  pokemsgdelete(msg)
})

// DELETE YOUTUBE LINKS
const ytlinksDelete = require('./Files/Moderation/ytlinks delete.js');
client.on("messageCreate", msg => {
  ytlinksDelete(msg)
})

// QUOTES CHANNEL MSG DELETE
const quotesMsgDelete = require('./Files/Moderation/quotes msg delete.js');
client.on("messageCreate", msg => {
  quotesMsgDelete(msg)
})

// ROLLENZUWEISEUN
const role = require('./Files/Moderation/rollenzuteilung.js');
client.on('messageReactionAdd', async (reaction, user) => {
  role.give(reaction, user)
})
client.on('messageReactionRemove', async (reaction, user) => {
  role.take(reaction, user)
})

// CLEAR

/*client.application(client.user.id).commands.post({data: {
  name: 'ping',
  description: 'ping pong!'
}})


client.on("interactionCreate", async interaction => {
	//if (!interaction.isChatInputCommand()) return;

	//const command = interaction.client.commands.get(interaction.commandName);
  console.log(interaction)
  console.log(command)
//	if (!command) {
//		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//		return;
//	}
/*
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}*/
//});

//  ____                                          _     
// / ___|___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
//| |   / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
//| |__| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
// \____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/

// RANDOM QUOTES
const randomquote = require('./Files/Commands/random quote');
client.on("messageCreate", msg => {
  randomquote(msg, client)
})

// RANDOM NUMBER
const randomnumber = require('./Files/Commands/random number');
client.on("messageCreate", msg => {
  randomnumber(msg)
})

// RANDOM ADVICE
const randomadvice = require('./Files/Commands/random advice');
client.on("messageCreate", async msg => {
  randomadvice(msg, random)
})

// RANDOM MEME
const randommeme = require('./Files/Commands/random meme.js');
client.on("messageCreate", async msg => {
  randommeme(msg, random)
})

// RANDOM FACT
const randomfact = require('./Files/Commands/random fact.js');
client.on("messageCreate", async msg => {
  randomfact(msg, random)
})

// RANDOM VIDEO: ERR=Requests to this API youtube method youtube.api.v3.V3DataSearchService.List are blocked.

/*const randomvideo = require('./Files/Commands/random video.js');
client.on("messageCreate", async msg => {
  randomvideo(msg, youtube)
})*/


// FLIP SMOKEN
const flip = require('./Files/Commands/flip.js');
client.on("messageCreate", async msg => {
  flip(msg)
})

// COMMAND LIST
const commands = require('./Files/Commands/command list.js');
client.on("messageCreate", async msg => {
  commands.commandListCommands(msg)
})

// RANDOM LIST
client.on("messageCreate", async msg => {
  commands.commandListRandom(msg)
})

// RANDOM CHAMP
const randomChamp = require('./Files/Commands/random champ.js');
client.on("messageCreate", msg => {
  randomChamp(msg)
})

// RANDOM ROLE
const randomRole = require('./Files/Commands/random role.js');
client.on("messageCreate", msg => {
  randomRole(msg)
})

// STATS LIST
client.on("messageCreate", async msg => {
  commands.commandListStats(msg)
})

// COMMAND LIST INTERACTION
client.on("interactionCreate", i => {
  commands.commandListButtonInteraction(i)
})

// INTERACTION SPIEGEL BESTSELLER
const bestseller = require('./Files/Commands/bestseller.js');
client.on("interactionCreate", i => {
  bestseller.interaction(i)
})

// INTERACTION SPIEGEL BESTSELLER
client.on("messageCreate", msg => {
  bestseller.msgCreate(msg)
})

// YT NOTIFS
/*const youtubeNotification = require('./Files/Commands/ytNotifs.js');
youtubeNotification.Fcn(ytNotifs, client);
youtubeNotification.Sub(ytNotifs);*/

// ROCK PAPER SCISSORS
const schereSteinPapier = require('./Files/Commands/schere stein papier.js');
client.on("messageCreate", msg => {
  schereSteinPapier(msg)
})

// TRANSLATE
const translator = require('./Files/Commands/translate.js');
client.on("messageCreate", msg => {
  translator(msg, translate)
})

// LEADERBOARD
const leaderboardMsg = require('./Files/Commands/leaderboard.js');
client.on("messageCreate", msg => {
  leaderboardMsg(msg)
})

// DOTIMG
const dotimg = require('./Files/Commands/dotimg.js');
client.on("messageCreate", msg => {
  dotimg(msg, discord)
})

// TTT PROFILE
const ttt = require('./Files/Commands/tic tac toe.js');
client.on("messageCreate", msg => {
  ttt.profile(msg)
})

// TTT LEADERBOARD
client.on("messageCreate", msg => {
  ttt.leaderboard(msg)
})

// TTT GAME
client.on("messageCreate", msg => {
  ttt.game(msg)
})

// VOTEMUTE
const votemute = require('./Files/Commands/vote mute.js');
client.on("messageCreate", msg => {
  votemute(msg)
})

// MUSIC PLAYER
const player = new Player(client, {
  leaveOnEmpty: false, // This options are optional.
});

const music = require('./Files/Commands/music.js');
  client.on('messageCreate', async msg => {
    music.play(msg, client, player)
})

// _____          _              _____                
//| ____|__ _ ___| |_ ___ _ __  | ____|__ _  __ _ ___ 
//|  _| / _` / __| __/ _ \ '__| |  _| / _` |/ _` / __|
//| |__| (_| \__ \ ||  __/ |    | |__| (_| | (_| \__ \
//|_____\__,_|___/\__\___|_|    |_____\__, |\__, |___/
//                                    |___/ |___/  

// HEY HEY
const hey_hey = require('./Files/Eastereggs/hey hey.js');
client.on("messageCreate", msg => {
  hey_hey(msg)
})

// POKEBOT MSG DELETE
const banger = require('./Files/Eastereggs/banger.js');
client.on("messageCreate", msg => {
  banger(msg)
})

// WEEB EASTER EGG
const weebEasterEgg = require('./Files/Eastereggs/weeb easter egg.js');
client.on("messageCreate", msg => {
  weebEasterEgg(msg, random)
})

// TRANSLATE EASTER EGG
const translatorEasterEgg = require('./Files/Eastereggs/translate easter egg.js');
client.on("messageCreate", msg => {
  translatorEasterEgg(msg, translate)
})

// LOGIN
const token = process.env.TOKEN
client.login(token) 
