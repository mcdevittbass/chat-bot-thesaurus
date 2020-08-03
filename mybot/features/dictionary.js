//const thesaurus = require("https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=e569694b-2440-4b3a-a5e2-b5d8fd6f1ca7")

module.exports = function(controller) {

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });

}
