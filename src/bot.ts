import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
//import {CommandHandler} from "./services/commandHandler";

@injectable()
export class Bot {
    private client: Client;
    private readonly discord_token: string;

    constructor(@inject(TYPES.Client) client: Client, @inject(TYPES.Discord_Token) token: string) {
        this.client = client;
        this.discord_token = token;
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            console.log('Message received! Contents: ', message.content);
        });

        return this.client.login(this.discord_token);
    }
}
