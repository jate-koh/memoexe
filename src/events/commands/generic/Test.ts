import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import packageJson from 'package.json';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import ConsoleLogger from '@/utils/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';

export default class Test extends GenericCommand {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('test')
        .setDescription('Bot test command');

    public run = async (interaction: CommandInteraction) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;

        /* Insert test statement in this Region*/
        const commandOps = new CommandOperator();
        commandOps.readCommandsDir();
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
