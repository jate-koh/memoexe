/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Client, CommandInteraction } from 'discord.js';
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';

import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import { commandList, specialCommandList } from '@/events/commands/CommandList';
import ConsoleLogger from '@/utils/ConsoleLogger';
import InstanceLoader from '@/utils/InstanceLoader';

export default class CommandOperator {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    private commandList: GenericCommand[]        = undefined;
    private specialCommandList: SpecialCommand[] = undefined;

    public constructor() {
        this.createList();
    }

    public createList(): void {
        this.commandList = commandList;
        this.specialCommandList = specialCommandList;
    }

    public readCommandsDir(): void {
        const genericPath = path.resolve(__dirname, 'generic');
        const specialPath = path.resolve(__dirname, 'special');

        let genericCommandFiles: string[];
        let specialCommandFiles: string[];
        try {
            genericCommandFiles = fs.readdirSync(genericPath).filter(
                (file) => file.endsWith('.js'),
            );
            specialCommandFiles = fs.readdirSync(specialPath).filter(
                (file) => file.endsWith('.js'),
            );
        } catch (error) {
            this.consoleLogger.getError('Unable to create file reference.');
            return;
        }

        genericCommandFiles.forEach((element) => {
            this.consoleLogger.sendInformationLog(element);
        });

    }

    private lookupGenericCommands(interaction: CommandInteraction): GenericCommand | undefined {
        for (const command of commandList) {
            if (interaction.commandName == command.data.name) {
                return command;
            }
        }
        return undefined;
    }

    private lookupSpecialCommands(interaction: CommandInteraction): SpecialCommand | undefined {
        for (const command of specialCommandList) {
            if (interaction.commandName == command.data.name) {
                return command;
            }
        }
        return undefined;
    }

    public lookupCommand(interaction: CommandInteraction):
    SpecialCommand | GenericCommand | undefined {
        let command: SpecialCommand | GenericCommand | undefined;
        command = this.lookupSpecialCommands(interaction);
        if (!command) command = this.lookupGenericCommands(interaction);
        return command;
    }

    public createCommandJson(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {

        const commandData = this.commandList.map((command) => command.data.toJSON());
        const specialCommandData = this.specialCommandList.map((command) => command.data.toJSON());

        specialCommandData.forEach((command) => {
            commandData.push(command);
        });

        return commandData;
    }

    public getSpecialList(): SpecialCommand[] {
        return this.specialCommandList;
    }

    public getGenericList(): GenericCommand[] {
        return this.commandList;
    }

}

// function lookupGenericCommands(interaction: CommandInteraction): GenericCommand | undefined {
//     for (const command of commandList) {
//         if (interaction.commandName == command.data.name) {
//             return command;
//         }
//     }
//     return undefined;
// }

// function lookupSpecialCommands(interaction: CommandInteraction): SpecialCommand | undefined {
//     for (const command of specialCommandList) {
//         if (interaction.commandName == command.data.name) {
//             return command;
//         }
//     }
//     return undefined;
// }

// export function lookupCommand(interaction: CommandInteraction):
// SpecialCommand | GenericCommand | undefined {

//     let command: SpecialCommand | GenericCommand | undefined;
//     command = lookupSpecialCommands(interaction);
//     if (!command) command = lookupGenericCommands(interaction);
//     return command;

//}
