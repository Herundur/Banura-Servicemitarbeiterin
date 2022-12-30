const discord = require("discord.js")
const { RepeatMode } = require('discord-music-player');

const settings = {
  prefix: '#',
};

const errorMessage = "⛔️ | **EIN PROBLEM IST AUFGETRETEN**.\n\nDiscord Applikation konnte entweder keine Suchergebnisse erziehlen oder es ist ein Fehler beim Herunterladen der Datei aufgetreten.\n\n**Wie behebe ich diesen Fehler:**\n• Youtube-Link verwenden.\n• Spotify-Link verwenden.\n• Titel grammatikalisch richtig schreiben.\n\nFalls diese Nachricht trotz oben genannten Anweisungen stets erscheinen sollte, kontaktieren Sie die zuständige informationstechnolgoische Fachkraft oder ändern Sie ihren Musikgeschmack."

const play = async (message, client, playerArg) => {
  client.player = playerArg;
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let guildQueue = client.player.getQueue(message.guild.id);

  let crashed = false;
  
    if(command === 'play') {
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(err => {
            message.channel.send(errorMessage);
            crashed = true;
            console.log(err);
            console.log(message);
            if(!guildQueue)
                queue.stop();
            ;
        });

        // IF ITS THE FIRST SONG IT QUEUE MESSAGE WILL SAY: NOW PLAYING... ELSE: ADDED TO QUEUE
        if (!crashed) {
          const nowPlayingOrPlaylistText = queue.songs.length <= 1 ? "🎵 | Wird abgespielt: " : "🎶 | Zur Playlist hinzugefügt: ";
          message.channel.send(`${nowPlayingOrPlaylistText}**${song.name}**`);
        }
    }

    if(command === 'playlist') {
      let queue = client.player.createQueue(message.guild.id);
      await queue.join(message.member.voice.channel);
      let song = await queue.playlist(args.join(' ')).catch(err => {
          console.log(err);
          console.log(message);
          message.channel.send(errorMessage);
          crashed = true;
          if(!guildQueue)
              queue.stop();
      });

      if (!crashed) {
        message.channel.send(`🎵 | Wird abgespielt: **${song.name}**`);
      }
  }

    if(command === 'skip') {
        message.channel.send(`⏩ | Song geskipped: **${guildQueue.songs[0].name}**`);
        guildQueue.skip();
    }

    if(command === 'stop') {
        message.channel.send(`⏹ | Song gestoppt: **${guildQueue.songs[0].name}**`);
        guildQueue.stop();
    }

    if(command === 'pause') {
        message.channel.send(`⏸ | Song pausiert: **${guildQueue.songs[0].name}**`);
        guildQueue.setPaused(true);
    }

    if(command === 'resume') {
        message.channel.send(`▶️ | Song fortgesetzt: **${guildQueue.songs[0].name}**`);
        guildQueue.setPaused(false);
    }

    client.player
      // Emitted when a first song in the queue started playing.
      .on('error', (error, queue) => {
          console.log(`Error: ${error} in ${queue.guild.name}`);
      });
}

module.exports = { play };