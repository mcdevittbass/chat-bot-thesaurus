const fetch = require('node-fetch');
const key = "key=e569694b-2440-4b3a-a5e2-b5d8fd6f1ca7";
const url = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/"

//endpoint = url + word + ? + key

module.exports = function(controller) {
    const wordArr = [];
    let x = 1;

    const callThesaurus = async (uri, i, word) => {
        const response = await fetch(uri).catch(err => new Error("Problem getting results: " + err));
        const data = await response.json().catch(err => new Error("Problem parsing results: " + err));
        if(data.length > 0) {
            if(data[i]) {
                if(data[i].meta) {
                    return `Here are some synonymns for ${word}: ${data[i].meta.syns[0].join(', ')}`;
                } else {
                    return `Can't find that word. Did you mean: ${data.join(', ')}?`
                }
            } else {
                return 'NO MORE! That is all the synonymns I have.'
            }
        } else {
            return "I couldn't find that word. Can you try again?"
        }
    }
    controller.on('message,direct_message', async (bot, message) => {
        const word = await message.text;
        wordArr.push(word);
        const endpoint = url + word + '?' + key;
        const synonyms = await callThesaurus(endpoint, 0, word).catch(err => err = new Error("Couldn't find that word! Try another one."));
        await bot.reply(message, synonyms);
        if(synonyms.includes('Here are some')) {
            await bot.reply(message, "If you want more synonymns, type 'more please'");
        }
    });

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'more please', ['message'], async(bot, message) => {
        let word = wordArr[wordArr.length - 1];
        console.log(word);
        const endpoint = url + word + '?' + key;
        const synonyms = await callThesaurus(endpoint, x, word).catch(err => err = new Error("Couldn't find that word! Try another one."));
        await bot.reply(message, synonyms);
        if(synonyms !== 'NO MORE! That is all the synonymns I have.') {
            await bot.reply(message, "If you want more synonmns, type 'more please'");
        }
        x += 1;
    }) 
}
