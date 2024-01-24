const  mosiDestiny = (newPresence) => {
    console.dir(newPresence);
    if (newPresence.userId == "451103088133144586" && newPresence.activities.length != 0) {
        if (newPresence.activities.some(activity => activity.name === 'Destiny 2')) {
            const channel = newPresence.guild.channels.cache.get('1049066933733032006');
            channel.send(`<@${newPresence.userId}>`);
        }
    }

}

module.exports = mosiDestiny;