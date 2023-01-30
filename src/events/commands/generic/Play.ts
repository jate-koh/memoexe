import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import packageJson from 'package.json';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import ConsoleLogger from '@/utils/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';

export default class Play extends GenericCommand {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption((option) => option.setName('query').setDescription('Name or link of song to search'));

    public run = async (interaction: CommandInteraction) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;

        const embedMusicInfo = new EmbedBuilder();
        embedMusicInfo.setTitle('**Playing Music**');
        embedMusicInfo.setDescription('null');
        embedMusicInfo.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });
        // await interaction.editReply({ embeds: [embedBotInfo] });

        await interaction.reply({ embeds: [embedMusicInfo] });
    };

    public getInstance(): object {
        return this;
    }

}
