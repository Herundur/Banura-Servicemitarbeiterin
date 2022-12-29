const  randomNumber = (msg) => {

    const randomNum = Math.floor(Math.random() * 100)

    if (msg.content.toLowerCase() === "#zufälligezahl") {

    let randomNum = Math.floor(Math.random() * 100)
    msg.reply(`Zufällige Zahl: ${randomNum}`)
    
    }

}

module.exports = randomNumber;