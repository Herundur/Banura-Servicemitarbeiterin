const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flip")
        .setDescription("Die MΓΌnze entscheidet."),
      //  .addStringOption(option =>
      //      option.setName('grund')
      //          .setDescription('warum verwenden Sie flip')
      //          .setRequired(true)),
    async execute(interaction) {
        let randomNumber2 = Math.floor(Math.random() * 100)
        await interaction.reply("Loading: π΄π΄π΄")
        setTimeout(function() {
            interaction.editReply("Loading: π’π΄π΄")
        }, 1500);
        setTimeout(function() {
            interaction.editReply("Loading: π’π’π΄")
    
        }, 3000);
        setTimeout(function() {
            interaction.editReply("Loading: π’π’π’")
        }, 4500);
        setTimeout(function() {
          if (randomNumber2 < 50) {
            interaction.editReply(`Ergebnis: ||β||`)
          } else { interaction.editReply("Ergebnis: ||β||") }
        }, 6500);
    }

}