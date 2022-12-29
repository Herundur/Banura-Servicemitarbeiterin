// yui reminder

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
        if(hasRoleBol && lastYuiDailyPaul.createdTimestamp < Date.now() - 43200*1000 && lastYuiDailyPaul.createdTimestamp >= lastBotReminder.createdTimestamp/* && yuiConfirm.author.id === "280497242714931202"*/) {
            channel1.send(remindMessageContent)
        }

        }})         
        
  
  
  
    playerWithRoleArray.forEach(playerId => eachPlayerCheck(playerId))
  
}
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
    } }})   