import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { Track } from 'discord-player';

import AudioPlayer from '@/utils/AudioPlayer';
import ConsoleLogger from '@/utils/ConsoleLogger';
import { Command } from '@/events/commands/Command';
import AuthManager from '@/utils/AuthManager';

export default class Play extends Command {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song');
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
        // .addSubcommand((subcommand) => subcommand
        //     .setName('search')
        //     .setDescription('Search for song based on provided keywords')
        //     .addStringOption((option) => option
        //         .setName('searchterms').setDescription('search\'s keywords').setRequired(true)));

    public run = async (interaction: CommandInteraction, authProvider: AuthManager) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        const { user } = interaction;
        const client = authProvider.getBotClient();
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;

        // const connection = joinVoiceChannel({
        //     channelId: voiceChannel.id,
        //     guildId: guild.id,
        //     adapterCreator: guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
        // });

        let song: Track | undefined;
        const audioPlayer = new AudioPlayer(authProvider);
        audioPlayer.createQueue(guild.id, voiceChannel.id);
        await audioPlayer.queryYouTubeMusic('creeper aw man', interaction.user.id)
            .then((track) => {
                song = track;
            });

        const embedMusicInfo = new EmbedBuilder();
        if (song) {
            embedMusicInfo.setTitle('**Playing Music**');
            embedMusicInfo.setThumbnail(song.thumbnail);
            embedMusicInfo.setDescription(`${song.title}`);
            embedMusicInfo.setAuthor({
                name: user.username,
                iconURL: user.displayAvatarURL(),
            });
        } else {
            embedMusicInfo.setTitle('**Song Not Found!**');
            embedMusicInfo.setAuthor({
                name: user.username,
                iconURL: user.displayAvatarURL(),
            });
        }

        await interaction.reply({ embeds: [embedMusicInfo] });
    };

    public getInstance(): object {
        return this;
    }

}
