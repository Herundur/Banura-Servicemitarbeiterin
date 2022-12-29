// SCHERE STEIN PAPIER

let result
const zufall = (k) => {
  if (k === 0) {
    let result = "Schere✂️"
    return result;
  } else if (k === 1) {
    let result = "Stein🪨"
    return result;
  } else if (k === 2) {
    let result = "Papier📄"
    return result;
  }
}

let countdown = (messageToEdit, d, j, msg) => {
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🔴🔴")
  }, 500);
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🟢🔴")
  }, 1000);
  setTimeout(function() {
    messageToEdit.edit("Bot spielt: 🟢🟢🟢")
  }, 1500);
  setTimeout(function() {
    messageToEdit.edit(`Bot spielt: **${d}**`)
  }, 2000);
  text("Schere✂️", "Papier📄", "Stein🪨", d, j, messageToEdit, msg)
  text("Stein🪨", "Schere✂️", "Papier📄", d, j, messageToEdit, msg)
  text("Papier📄", "Stein🪨", "Schere✂️", d, j, messageToEdit, msg)
  setTimeout(function() {
    if (j === "Brunnen🤡") {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}**           https://media.giphy.com/media/3rZ1KMI2p485QtNY9x/giphy.gif`)
    }
  }, 4250);
}

const ssp = {
  reply(karte, msg) {
    let k = Math.floor(Math.random() * 3)
    let j = karte
    if (zufall(k) === "Papier📄") {
      let d = "Papier📄"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg))
    } else if (zufall(k) === "Stein🪨") {
      let d = "Stein🪨"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg))
    } else if (zufall(k) === "Schere✂️") {
      let d = "Schere✂️"
      let messageToEdit = msg.reply(`Bot spielt: 🔴🔴🔴`).then((messageToEdit) => countdown(messageToEdit, d, j, msg));
    }
  }
};

const text = (karte, loser, win, d, j, messageToEdit, msg) => {
  setTimeout(function() {
    if (j === karte && d === loser) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}**`)
      setTimeout(function() {
        messageToEdit.edit(`Bot spielt: **${d}** \n\n**${j}** schlägt **${d}** \n\n${msg.author} gewinnt!🏆`)
      }, 750);
    } else if (j === karte && d === win) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**${d}** schlägt **${j}**`)
      setTimeout(function() {
        messageToEdit.edit(`Bot spielt: **${d}** \n\n**${d}** schlägt **${j}** \n\n ${msg.author} verliert!💀`)
      }, 750);
    } else if (j === karte && d === karte) {
      messageToEdit.edit(`Bot spielt: **${d}** \n\n**🔁UNENTSCHIEDEN🔁**`)
    }
  }, 4250);
}

const schereSteinPapier = (msg) => {

  if (msg.content.toLowerCase() === "#schere" || "#stein" || "#papier" || "brunnen") {
    if (msg.content.toLowerCase() === "#schere") {
      ssp.reply("Schere✂️", msg);
    } else if (msg.content.toLowerCase() === "#stein") {
      ssp.reply("Stein🪨", msg);
    } else if (msg.content.toLowerCase() === "#papier") {
      ssp.reply("Papier📄", msg);
    } else if (msg.content.toLowerCase() === "#brunnen") {
      ssp.reply("Brunnen🤡", msg);
    }
  }
  
}

module.exports = schereSteinPapier;