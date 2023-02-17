//@ts-nocheck
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { Track } from 'discord-player';

import AudioPlayer from '@/utils/audioplayer/AudioPlayer';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import { Command } from '@/events/commands/Command';
import AuthManager from '@/utils/AuthManager';
import { MemoPlayer } from '@/Memo';

export default class Play extends Command {

    private consoleLogger = new ConsoleLogger('Command: Play');

    public data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addSubcommand((subcommand) => subcommand
            .setName('url')
            .setDescription('Loads a single song from url')
            .addStringOption((option) => option
                .setName('url').setDescription('Song\'s url').setRequired(true)))
        // .addSubcommand((subcommand) => subcommand
        //     .setName('playlist')
        //     .setDescription('Loads a playlist of songs from a url')
        //     .addStringOption((option) => option
        //         .setName('url').setDescription('Playlist\'s url').setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('search')
            .setDescription('Search for song based on provided keywords')
            .addStringOption((option) => option
                .setName('keywords').setDescription('search\'s keywords').setRequired(true)));

    public run = async (interaction: CommandInteraction, authProvider: AuthManager) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;
        const client = authProvider.getBotClient();
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) interaction.reply({ content: 'You must be in a voice channel to use this command!' });

        try {
            let song: Track | undefined;
            const embedMusicInfo = new EmbedBuilder();
            //const audioPlayer = new AudioPlayer(authProvider);
            MemoPlayer.connect(guild.id, voiceChannel.id, member.voice.channel);

            if (interaction.options.getString('searchterms')) {
                await MemoPlayer.queryKeywords(interaction.options.getString('keywords'), interaction.user.id)
                    .then((track) => {
                        song = track;
                    });
            } else if (interaction.options.getString('url')) {
                await MemoPlayer.queryKeywords(interaction.options.getString('url'), interaction.user.id)
                    .then((track) => {
                        song = track;
                    });
            }

            if (song) {
                embedMusicInfo
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setThumbnail(song.thumbnail)
                    .setAuthor({
                        name: user.username,
                        iconURL: user.displayAvatarURL(),
                    })
                    .addFields({
                        name: 'Duration',
                        value: song.duration,
                        inline: true,
                    });
            } else {
                embedMusicInfo
                    .setTitle('**Song Not Found!**')
                    .setAuthor({
                        name: user.username,
                        iconURL: user.displayAvatarURL(),
                    });
            }
            await interaction.reply({ embeds: [embedMusicInfo] });
            await MemoPlayer.play();
        } catch (error) {
            this.consoleLogger.sendErrorLog(error);
        }
    };

    public getInstance(): object {
        return this;
    }

}

// const connection = joinVoiceChannel({
//     channelId: voiceChannel.id,
//     guildId: guild.id,
//     adapterCreator: guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
// });
