import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import packageJson from 'package.json';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import ConsoleLogger from '@/utils/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';

export default class Version extends GenericCommand {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

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

        const commandOps = new CommandOperator();
        commandOps.createGenericCommandsList();

        // await interaction.editReply({ embeds: [embedBotInfo] });
        await interaction.reply({ embeds: [embedBotInfo] });
    };

}
