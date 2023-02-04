import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import AuthManager from '@/utils/AuthManager';

export abstract class Command {

    public abstract data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandSubcommandsOnlyBuilder;

    public abstract run(command: CommandInteraction, authProvider?: AuthManager): Promise<void>;

    public abstract getInstance(): object;

}
