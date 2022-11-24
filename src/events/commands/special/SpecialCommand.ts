import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import AuthManager from '@/utils/AuthManager';
import { Command } from '@/events/commands/Command';

export abstract class SpecialCommand extends Command {

    public data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandSubcommandsOnlyBuilder;

    public abstract override run(command: CommandInteraction, auth?: AuthManager): Promise<void>;

    public getType(): object {
        return SpecialCommand;
    }

}
