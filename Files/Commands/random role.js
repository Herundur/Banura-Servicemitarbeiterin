const  randomrole = (msg) => {

    const lolRoles = ["ADC <:adc:961375127726063628>", "Jungle <:jungle:961375060977913916>", "Support <:support:961375044599181323>", "Toplane <:toplane:961375031236108378>", "Midlane <:midlane:961375105508835368>"];

    if (msg.content.toLowerCase() === "#randomrole") {
        let i = Math.floor(Math.random() * 5)
        msg.reply(`Zufällige Rolle: **${lolRoles[i]}**`)
    }

}

module.exports = randomrole;