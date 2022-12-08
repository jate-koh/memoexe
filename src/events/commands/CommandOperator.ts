import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { CommandInteraction } from 'discord.js';
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v9';

import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import { commandList, specialCommandList } from '@/events/commands/CommandList';
import ConsoleLogger from '@/utils/ConsoleLogger';

export default class CommandOperator {

    private consoleLogger = new ConsoleLogger(this.constructor.name);
    private commandList: GenericCommand[] = undefined;
    private specialCommandList: SpecialCommand[] = undefined;

    public constructor() {
        this.commandList = commandList;
        this.specialCommandList = specialCommandList;
    }

    public createGenericCommandsList(): void {
        const genericList: GenericCommand[] = undefined;
        const genericPath = path.join(__dirname, 'generic');

        fs.readdir(genericPath, (error, files) => {
            if (error) this.consoleLogger.sendErrorLog(`'fs' failed to read directory in ${genericPath}`);

            files.forEach((file) => {
                fs.readFile(file, (err, data) => {
                    console.log(`TEST2 ${file} ${JSON.stringify(data)}`);
                });
            });
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
