const releaseDate = new Date(2023, 1, 23);

const sonsOfTheForest = msg => {

  if (msg.content.startsWith("#son")) {

    const dateNow = new Date();
    const timeLeft = releaseDate - dateNow;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24).toString();
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60).toString();  

    msg.channel.send(`Release in:**${days} Tog**, **${hours} Stund** und **${minutes} Minutn** POG POG POG POG POG POG!!!`);

  }


}

module.exports = sonsOfTheForest;