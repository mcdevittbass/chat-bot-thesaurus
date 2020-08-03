const https = require("https");
const thesaurus = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=e569694b-2440-4b3a-a5e2-b5d8fd6f1ca7";


let syns = '';
https.get(thesaurus, async resp => {
    let data = '';

    await resp.on('data', (chunk) => {
        data += chunk; 
    });

    await resp.on('end', () => {
        syns = JSON.parse(data).syns;
        console.log(syns);
    });

}).on('err', err => {
    console.log("Error: " + err.message);
  });

module.exports = function(controller) {

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'syn', ['message'], async (bot, message) => {
        await bot.reply(message, syns);
    });

}
