const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flip")
        .setDescription("Die Münze entscheidet."),
      //  .addStringOption(option =>
      //      option.setName('grund')
      //          .setDescription('warum verwenden Sie flip')
      //          .setRequired(true)),
    async execute(interaction) {
        let randomNumber2 = Math.floor(Math.random() * 100)
        await interaction.reply("Loading: 🔴🔴🔴")
        setTimeout(function() {
            interaction.editReply("Loading: 🟢🔴🔴")
        }, 1500);
        setTimeout(function() {
            interaction.editReply("Loading: 🟢🟢🔴")
    
        }, 3000);
        setTimeout(function() {
            interaction.editReply("Loading: 🟢🟢🟢")
        }, 4500);
        setTimeout(function() {
          if (randomNumber2 < 50) {
            interaction.editReply(`Ergebnis: ||✅||`)
          } else { interaction.editReply("Ergebnis: ||❌||") }
        }, 6500);
    }

}