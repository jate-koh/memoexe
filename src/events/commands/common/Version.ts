import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import packageJson from 'package.json';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';
import { Command } from '@/events/commands/Command';

export default class Version extends Command {

    private consoleLogger = new ConsoleLogger('Command: Version');

    public data = new SlashCommandBuilder()
        .setName('version')
        .setDescription('View bot info regarding build version');

    public run = async (interaction: CommandInteraction) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;

        const embedBotInfo = new EmbedBuilder();
        embedBotInfo.setTitle('**Bot Information**');
        embedBotInfo.setDescription(`Bot Version: **${packageJson.version}**
            Bot Name: **${packageJson.name}**`);
        embedBotInfo.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });

        // await interaction.editReply({ embeds: [embedBotInfo] });
        await interaction.reply({ embeds: [embedBotInfo] });
    };

    public getInstance(): object {
        return this;
    }

}
