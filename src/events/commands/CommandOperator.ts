/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Client, CommandInteraction } from 'discord.js';
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';

import { Command } from '@/events/commands/Command';
import { commandList } from '@/events/commands/CommandList';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import InstanceLoader from '@/utils/InstanceLoader';

export default class CommandOperator {

    private commandList: Command[] = undefined;

    public constructor() {
        this.createList();
    }

    public createList(): void {
        this.commandList = commandList;
    }

    public lookupCommand(interaction: CommandInteraction):
    Command | undefined {
        let command: Command;
        for (command of commandList) {
            if (interaction.commandName == command.data.name) {
                return command;
            }
        }
        return undefined;
    }

    public createCommandJson(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
        const commandData = this.commandList.map((command) => command.data.toJSON());
        return commandData;
    }

    public getCommandList(): Command[] {
        return this.commandList;
    }

}

// public readCommandsDir(): void {
//     const genericPath = path.resolve(__dirname, 'generic');
//     const specialPath = path.resolve(__dirname, 'special');

//     let genericCommandFiles: string[];
//     let specialCommandFiles: string[];
//     try {
//         genericCommandFiles = fs.readdirSync(genericPath).filter(
//             (file) => file.endsWith('.js'),
//         );
//         specialCommandFiles = fs.readdirSync(specialPath).filter(
//             (file) => file.endsWith('.js'),
//         );
//     } catch (error) {
//         this.consoleLogger.getError('Unable to create file reference.');
//         return;
//     }

//     genericCommandFiles.forEach((element) => {
//         this.consoleLogger.sendInformationLog(element);
//     });
// }

// private lookupGenericCommands(interaction: CommandInteraction): GenericCommand | undefined {
//     for (const command of commandList) {
//         if (interaction.commandName == command.data.name) {
//             return command;
//         }
//     }
//     return undefined;
// }

// private lookupSpecialCommands(interaction: CommandInteraction): SpecialCommand | undefined {
//     for (const command of specialCommandList) {
//         if (interaction.commandName == command.data.name) {
//             return command;
//         }
//     }
//     return undefined;
// }
