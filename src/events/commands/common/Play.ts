import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { Track } from 'discord-player';

import AudioPlayer from '@/utils/AudioPlayer';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import { Command } from '@/events/commands/Command';
import AuthManager from '@/utils/AuthManager';
import { MemoPlayer } from '@/Memo';

export default class Play extends Command {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        // .addSubcommand((subcommand) => subcommand
        //     .setName('song')
        //     .setDescription('Loads a single song from url')
        //     .addStringOption((option) => option
        //         .setName('url').setDescription('Song\'s url').setRequired(true)));
        // .addSubcommand((subcommand) => subcommand
        //     .setName('playlist')
        //     .setDescription('Loads a playlist of songs from a url')
        //     .addStringOption((option) => option
        //         .setName('url').setDescription('Playlist\'s url').setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('search')
            .setDescription('Search for song based on provided keywords')
            .addStringOption((option) => option
                .setName('searchterms').setDescription('search\'s keywords').setRequired(true)));

    public run = async (interaction: CommandInteraction, authProvider: AuthManager) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;
        const client = authProvider.getBotClient();
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
        });

        try {
            let song: Track | undefined;
            //const audioPlayer = new AudioPlayer(authProvider);
            MemoPlayer.createQueue(guild.id, voiceChannel.id, member.voice.channel);

            //@ts-ignore
            await MemoPlayer.searchYouTube(interaction.options.getString('searchterms'), interaction.user.id)
                .then((track) => {
                    song = track;
                });
            await MemoPlayer.playMusic(song);

            const embedMusicInfo = new EmbedBuilder();

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
        } catch (error) {
            this.consoleLogger.sendErrorLog(error);
        }
    };

    public getInstance(): object {
        return this;
    }

}
