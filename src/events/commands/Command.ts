import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export abstract class Command {

    public abstract data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandSubcommandsOnlyBuilder;

    public abstract run(command: CommandInteraction): Promise<void>;

    public abstract getInstance(): object;

    public abstract getType(): object;

}
