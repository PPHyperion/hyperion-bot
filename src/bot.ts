import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { CommandHandler } from './services/commandHandler';
import { TYPES } from './types';

@injectable()
export class Bot {
    private client: Client;
    private readonly discord_token: string;

    constructor(@inject(TYPES.Client) client: Client, @inject(TYPES.Discord_Token) token: string) {
        this.client = client;
        this.discord_token = token;
    }

    public listen(): Promise<string> {
        let commandHandler: CommandHandler = new CommandHandler('test');
        this.client.on('message', (message: Message) => {
            if (!message.content.startsWith('!') || message.author.bot) {
                return;
            }

            let command: string,
                args: string[] = new Array<string>();
            message.content
                .replace(/[!]*/, '')
                .split(' ')
                .forEach((el, idx) => {
                    idx === 0 ? (command = el) : args.push(el);
                });

            console.log('Executing command: ', command, 'with args ', args);
            commandHandler.handle(message, command, args);
        });

        return this.client.login(this.discord_token);
    }
}
