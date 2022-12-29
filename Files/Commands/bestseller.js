const exportsSpiegel = require("./spiegelbestseller");

const interaction = async (interaction) => {

    exportsSpiegel.pages(interaction, 1, "forward0", "back1")
    exportsSpiegel.pages(interaction, 2, "forward1", "back2")
    exportsSpiegel.pages(interaction, 3, "forward2", "back3")
    exportsSpiegel.pages(interaction, 4, "forward3", "back4")
    exportsSpiegel.pages(interaction, 5, "forward4", "back0")

}

const msgCreate = async (message) => {

  if (message.content.toLowerCase() === "#bestseller") {
  message.channel.send({ embeds: [exportsSpiegel.embedExports[0]], components: [exportsSpiegel.buttonExports[0]] })
  }

}

module.exports = { msgCreate, interaction};