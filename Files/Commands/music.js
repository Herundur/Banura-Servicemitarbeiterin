const discord = require("discord.js")
//const client = require("/Users/paul-/Desktop/Discord-Bots/Banura-Servicemitarbeiterin/Banura-Servivemitarbeiterin/index.js")
//console.log(client)
const { Player } = require("discord-music-player");
const { RepeatMode } = require('discord-music-player');

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


const endEmbed = new discord.MessageEmbed()
.setColor("#94078C")
.setTitle("Zurzeit wird kein Lied abgespielt.")
.setAuthor({ name: '🎶 aktuelle Wiedergabe:'})
.setThumbnail("https://it-talents.de/tag/it-stipendium-2021/")
.setTimestamp()
.setFooter({ text: `Banura`, iconURL: 'https://cdn.discordapp.com/attachments/951243124489990225/955461759475523634/green-b-md.png' });

//const playerCreator = async (client)

const play = async (message, client, playerArg) => {
  //console.log(client)
  const player = playerArg
  // You can define the Player as *client.player* to easily access it.
  client.player = player;


 // VON DA AN WEG
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    let guildQueue = client.player.getQueue(message.guild.id);
  
    if(command === 'play' && message.member.voice.channel !== null) {
        let queue = client.player.createQueue(message.guild.id);
       // console.log(queue)
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
           // console.log(guildQueue)
            //console.log(client.player)
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

  client.player
    .on('songChanged', (queue, newSong, oldSong) => {
      let stats = player.getQueue(messageObj.id.guild.id)
      messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], messageObj.username[0], stats.songs.length)], components: [playerButtonsPause] }))
      messageObj.username.shift()
      console.log("yikes")
    })
    
} 
 /* client.player
    .on('songChanged', (queue, newSong, oldSong) => {
      let stats = player.getQueue(messageObj.id.guild.id)
      messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], messageObj.username[0], stats.songs.length)], components: [playerButtonsPause] }))
      messageObj.username.shift()
    })
    .on('queueEnd',  (queue) => {
      //let stats = player.getQueue(messageObj.id.guild.id)
      //messageObj.id.edit(({ embeds: [endEmbed], components: [] }))
    })
  

*/
const events = async (queue, newSong, oldSong, player) => {
  let stats = player.getQueue(messageObj.id.guild.id)
  messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], messageObj.username[0], stats.songs.length)], components: [playerButtonsPause] }))
  messageObj.username.shift()
}

/*client.player
  .on('songChanged', (queue, newSong, oldSong) => {
    let stats = player.getQueue(messageObj.id.guild.id)
  messageObj.id.edit(({ embeds: [embedPlayCreator(stats.songs[0], messageObj.username[0], stats.songs.length)], components: [playerButtonsPause] }))
  messageObj.username.shift()
  })
*/
module.exports = { play, events };