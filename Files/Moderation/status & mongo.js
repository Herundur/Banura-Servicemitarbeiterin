const statusMongo = async (client, mongoose) => {

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
  
}

module.exports = statusMongo;