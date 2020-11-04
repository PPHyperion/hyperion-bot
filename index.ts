require('dotenv').config();
import container from './src/inversify.config';
import { TYPES } from './src/types';
import { Bot } from './src/bot';

let bot = container.get<Bot>(TYPES.Bot);
bot.listen()
    .then(() => {
        console.log('Loggend in!');
    })
    .catch((error) => {
        console.log('Error occured! ', error);
    });
