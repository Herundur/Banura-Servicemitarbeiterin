// TIME LEFT MIX DER WOCHE

let interval;
const eventDay = new Date(Date.UTC(2022, 3, 25, -1, 0, 0));

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countDownFn = () => {
  const now = new Date();
  const timeSpan = eventDay - now;
  if (timeSpan <= -now) {
    console.log("Unfortunately we have past the event day");
    clearInterval(interval);
    return;
  } else if (timeSpan <= 0) {
    console.log("Today is the event day");
    clearInterval(interval);
    return;
  } else {
    const days = Math.floor(timeSpan / day);
    const hours = Math.floor((timeSpan % day) / hour);
    const minutes = Math.floor((timeSpan % hour) / minute);
    const seconds = Math.floor((timeSpan % minute) / second);

    const zeit = [days, hours, minutes, seconds];
    return zeit;
  }
};

client.on("messageCreate", msg => {
  if (msg.content.toLowerCase() === "#mixderwoche") {
    msg.reply(`🎶Neuer **Mix der Woche** in ${countDownFn()[0]} Tagen, ${countDownFn()[1]} Stunden, ${countDownFn()[2]} Minuten, ${countDownFn()[3]} Sekunden.`)
  }
})

//messages.forEach(message => quotes.push(message.content))
