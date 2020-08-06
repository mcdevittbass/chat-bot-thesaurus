/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    // controller.hears('sample','message,direct_message', async(bot, message) => {
    //     await bot.reply(message, 'I heard a sample message.');
    // });

    controller.on(['hello', 'welcome_back'] , async(bot) => {
        console.log("user joined!")
        await bot.say("Welcome! I am a Thesaurus Bot. Send me a word and I will send you synonyms for it!");
    });

}
