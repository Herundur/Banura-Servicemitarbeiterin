const discord = require("discord.js")

const leaderboard = async (msg) => {
    if (msg.content.toLowerCase() === "#ttt leaderboard") {
  
        const playerName = {
          list: [],
        }
        const playerElo = require("./ttt schema.js")
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
      }

  }
  
const profile = async (message) => {
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
        
    
        const playerElo = require("./ttt schema.js")
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
}

const game = async (msg) => {
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
    
    const playerElo = require("./ttt schema.js")
        
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
}
  module.exports = { profile, leaderboard, game };