import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { } from '@discordjs/voice';

import packageJson from 'package.json';
import ConsoleLogger from '@/utils/ConsoleLogger';
import CommandOperator from '@/events/commands/CommandOperator';
import { Command } from '@/events/commands/Command';

export default class Play extends Command {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addSubcommand((subcommand) => subcommand
            .setName('song')
            .setDescription('Loads a single song from url')
            .addStringOption((option) => option
                .setName('url').setDescription('Song\'s url').setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('playlist')
            .setDescription('Loads a playlist of songs from a url')
            .addStringOption((option) => option
                .setName('url').setDescription('Playlist\'s url').setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('search')
            .setDescription('Search for song based on provided keywords')
            .addStringOption((option) => option
                .setName('searchterms').setDescription('search\'s keywords').setRequired(true)));

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
        await interaction.reply({ embeds: [embedMusicInfo] });
    };

    public getInstance(): object {
        return this;
    }

}
