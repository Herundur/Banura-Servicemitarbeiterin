
// ROLLEN ZUTEILUNG
/*
client.on("messageCreate", async msg => {
  if (msg.content.toLowerCase() === "m") {
    /*msg.channel.send
      
      (`**automatische Rollenzuweisung:**\n<:emotelol:961377411969192006> League Of Legends\n<:emotecsgo:961437665566281768> Counter Strike: Global Offensive\n<:emotemc:963956314680217610> Minecraft`)
  await msg.channel.messages.fetch("1010914943949869056")
  .then(message => message.edit(`**selbstständige Rollenzuweisung:**\n<:emotelol:961377411969192006> League Of Legends\n<:emotecsgo:961437665566281768> Counter Strike: Global Offensive\n<:sot:1010737597829611632> Sea of Thieves\n✏️ Skribbl.io/Gartic Phone\n<:pokemon:974283332642803712> Pokémon`))
  .then(message => message.react("<:pokemon:974283332642803712>"))
    
  }
})
*/
//
//'✏️'
//<:emotecsgo:961437665566281768>
//<:sot:1010737597829611632>
//<:emotelol:961377411969192006>
//<:pokemon:974283332642803712>

const give = async (reaction, user) => {	
  
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
rollenGive('sot', "988210307245694977")
//rollenGive("emotemc", "777130913494335498")
rollenGive('✏️', "656941146269810707")
rollenGive('pokemon', "546061416407367700")
rollenGive('🎶', "1013779211271548948")
rollenGive('📻', "1013951182999396393")

}

const take = async (reaction, user) => {
  
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
  if (reaction.message.id === "1010914943949869056" && user.bot === false && reaction.emoji.name === rolleEmote) {
           player.roles.remove(rolleID)
}}
  
rollenTake("emotelol", "705132213070463036")
rollenTake("emotecsgo", "900092444333473813")
rollenTake('sot', "988210307245694977")
//rollenTake("emotemc", "777130913494335498")
rollenTake('✏️', "656941146269810707")
rollenTake('pokemon', "546061416407367700")
rollenTake('🎶', "1013779211271548948")
rollenTake('📻', "1013951182999396393")

}

module.exports = { give, take};