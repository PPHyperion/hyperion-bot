import { Message } from 'discord.js';

export interface Executable {
    execute(message: Message, args: string[]): void;
}
