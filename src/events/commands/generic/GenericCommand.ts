import {
    Client,
    CommandInteraction,
    Interaction,
} from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { Command } from '@/events/commands/Command';

export abstract class GenericCommand extends Command {

    public data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandSubcommandsOnlyBuilder;

    public abstract run(command: CommandInteraction): Promise<void>;

    public getType(): object {
        return GenericCommand;
    }

}
