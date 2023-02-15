const banger = async (message) => {

  if (message.content.toLowerCase().includes("#bang") && message.author.bot !== true) {

    const gifs = ["https://tenor.com/view/lachen-gl%C3%BCcklich-witzig-haha-kichern-gif-13052249",
                  "https://media.tenor.com/Pb0iN7Z2q_YAAAAd/farid-bang-visa-vie.gif",
                  "https://media.tenor.com/HvcAL3rUepcAAAAC/niemals-ant%C3%A4uschen-farid-bang.gif",
                  "https://media.tenor.com/q6hckkKuBYEAAAAd/farid-bang-beine.gif",
                  "https://media0.giphy.com/media/6CedI2fbVO2rd5yAA2/giphy.gif",
                  "https://i.makeagif.com/media/4-24-2018/065Q1W.gif",
                  "https://i.makeagif.com/media/12-03-2017/1Ursex.gif",
                  "https://data.whicdn.com/images/152858897/original.gif",
                  "https://i.makeagif.com/media/10-31-2015/rMJGVA.gif",
                ];

    const quotes = ["Bleibe Banger, Leichenschänder, ich fick Anna Nicole Smith. Und bin ich dabei, hat mein Freund Anis nie Colts mit.",
                    "Denn an Nikolaus geh ich mit Nicole aus. Zwei Gläser Sekt und dann zieht sich Nicole aus.",
                    "Und ficke ich Nicole, findet sie es astrein. Und fickst du sie, denkt sie, man schiebe ihr nen Ast rein.",
                    "Ich holte meinen Dick raus und die Fotze fing an. Zu blasen, also musste ich die Fotze fingern.",
                    "Weißt du was Nicole, ich konnte dir nie widerstehen. Und du nach der Nacht nie wieder stehen.",
                    "Ich werde es Cameron Diaz besorgen. Während Schwarze wie Cameron dir es besorgen.",
                    "Ey, und dann treff' ich Queensberry und prahl' ihnen was vor. Und Gabriela mach ich mit Pralinen was vor.",
                    "Danach hab ich im Hotel mit ihr ein Abenteuer. Kokain und Sekt, für mich wird der Abend teuer.",
                    "In dieses Biz bring ich Verbrecher und Geldwäscher rein. Während du dich geschlossen hältst wie Geldwäschereien.",
                    "Zu der Jeans hab ich die Schuhe von Boss nie an. Ich komm mit Serben, Hrvatskis und Bosniern.",
                    "Oder ich komm in den Club mit zwanzig Türken. Doch wir zahlen nichts, weil uns die Leute an der Tür kennen.",
                    "Komm in deine Hood in den achten Stock. Doch irgendwas hab' ich vergessen, ach den Stock.",
                    "Du willst sein wie ich, weil du dich in Kneipen haust. Doch siehst aus wie jemand, der in Kneipen haust.",
                    "Heute werde ich für mein Video deine Mutter casten. Denn damals hieß es, ich fick' deine Mutter Carsten.",
                    "Zirka fünfzehn Jahre, bevor wir Dinger drehten. Wurde ich beschnitten und sah mein Ding an Drähten.",
                    "Ich lauf', damit mich keiner der Bullen einpackt. Und was machst du? Du schließt mit den Bullen ein' Pakt.",
                    "Der erste Vato in Monaco, ich werd' Kokain in Prag ticken. Und zeige dann LaFee sexuelle Praktiken.",
                    "Ich will arschficken und trinke an Sabbat Rum. Deine Bitch leckt meine Eier, doch sie sabbert rum.",
                    "Schon in jungen Jahren hieß es, Farid frisst scheiße. Ich fick' den Richter, weil ich auf seine Frist scheiße.",
                    "Währenddessen rappst du über Eiweiß und Ballaststoff. Kids sagen: „Farid Bang, du ballerst Stoff!“",
                    "Weil Gina ihren Mann nie mag, doch sein Money mag. Fick ich die Bitch mit Frauenarzt und Manny Marc (yeah).",
                    "Und ich besuch' mit Godsilla Chile. Doch selbst dort sagen alle, dass Godsilla schiele.",
                    "Und ich lande im Rockerschuppen. Und bemerk' bei den nach Schweiß stinkenden Rockern Schuppen.",
                    "Zur Feier des Tages mach' ich im Club Palaver. Währenddessen triffst du schwuler Hund im Club paar Lover."
                  ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const quoteRandomNumber = Math.floor(getRandomArbitrary(0, 24));
    const gifRandomNumber = Math.floor(getRandomArbitrary(0, 9));
    
    message.reply(`**"${quotes[quoteRandomNumber]}"**\n-Farid Bang (bürgerlich Farid Hamed El Abdellaoui)`);
    message.channel.send(gifs[gifRandomNumber]);

  }
}

module.exports = banger;