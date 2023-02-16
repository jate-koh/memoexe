import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import packageJson from 'package.json';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';
import { Command } from '@/events/commands/Command';

export default class Test extends Command {

    private consoleLogger = new ConsoleLogger('Command: Test');

    public data = new SlashCommandBuilder()
        .setName('test')
        .setDescription('Bot test command');

    public run = async (interaction: CommandInteraction) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;

        /* Insert test statement in this Region*/

        /* END TEST REGION */

        const embedTestInfo = new EmbedBuilder();
        embedTestInfo.setTitle('**Bot Test Command**');
        embedTestInfo.setDescription('Test: Done!');
        embedTestInfo.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });
        // await interaction.editReply({ embeds: [embedBotInfo] });

        await interaction.reply({ embeds: [embedTestInfo] });
    };

    public getInstance(): object {
        return this;
    }

}
