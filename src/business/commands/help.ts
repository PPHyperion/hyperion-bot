import { Executable } from '../interfaces/executable';
import { Message } from 'discord.js';

export class Help implements Executable {
    public execute(message: Message, args: string[]): void {
        message.channel.send('Simple answer');
    }
}
