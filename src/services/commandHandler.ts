import { Message } from 'discord.js';
import { Executable } from '../business/interfaces/executable';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Help } from '../business/commands/help';

@injectable()
export class CommandHandler {
    private guildId: string;
    private commandList: Map<string, Executable>;

    constructor(guildId: string) {
        this.guildId = guildId;
        this.commandList = this.loadCommands();
    }

    public handle(message: Message, command: string, args: string[]): void {
        this.commandList.forEach((value: Executable, key: string) => {
            if (command === key) {
                value.execute(message, args);
            }
        });
    }

    private loadCommands(): Map<string, Executable> {
        //TODO: refactor - bad solution
        let retVal: Map<string, Executable> = new Map<string, Executable>();

        retVal.set('help', new Help());

        return retVal;
    }
}
