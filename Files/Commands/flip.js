const flip = async (msg) => {

    if (msg.content.toLowerCase().startsWith("#flip")) {
        let randomNumber2 = Math.floor(Math.random() * 100)
        let messageToEdit = await msg.channel.send("Loading: 🔴🔴🔴")
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

}

module.exports = flip;