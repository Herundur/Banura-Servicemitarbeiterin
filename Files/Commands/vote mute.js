const discord = require("discord.js")

const votemute = async (msg) => {

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

}

module.exports = votemute;