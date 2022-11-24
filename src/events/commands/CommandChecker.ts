import { CommandInteraction } from 'discord.js';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import { commandList, specialCommandList } from '@/events/commands/CommandList';

function checkGeneric(interaction: CommandInteraction): GenericCommand | undefined {
    for (const command of commandList) {
        if (interaction.commandName == command.data.name) {
            return command;
        }
    }
    return undefined;
}

function checkSpecial(interaction: CommandInteraction): SpecialCommand | undefined {
    for (const command of specialCommandList) {
        if (interaction.commandName == command.data.name) {
            return command;
        }
    }
    return undefined;
}

export function lookupCommand(interaction: CommandInteraction):
SpecialCommand | GenericCommand | undefined {

    let command: SpecialCommand | GenericCommand | undefined;
    command = checkSpecial(interaction);
    if (!command) command = checkGeneric(interaction);
    return command;

}
