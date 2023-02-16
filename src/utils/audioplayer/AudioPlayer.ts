import {
    Player, PlayerSearchResult, QueryType, Queue, Track,
} from 'discord-player';
import {
    ChannelResolvable, Client, CommandInteraction,
    GuildChannel,
    GuildChannelResolvable,
    GuildResolvable, UserResolvable,
} from 'discord.js';

import { MemoAuthManager as MainAuthManager } from '@/Memo';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';
import TracksQueue from '@/utils/audioplayer/TracksQueue';
import SearchCache from '@/utils/audioplayer/SearchCache';

export default class AudioPlayer {

    private static audioPlayerInstance: AudioPlayer;

    private client: Client                  = undefined;
    private player: Player                  = undefined;

    private isPlaying: boolean;
    private tracksList: TracksQueue         = undefined;
    private consoleLogger: ConsoleLogger    = new ConsoleLogger('Audio Player');
    private cacheResult: SearchCache        = new SearchCache();

    private constructor(authProvider?: AuthManager) {
        if (authProvider) this.client = authProvider.getBotClient();

        // If not set, default to Main Auth Provider
        else this.client = MainAuthManager.getBotClient();
    }

    public static getAudioPlayerInstance(authProvider?: AuthManager): AudioPlayer | null {
        if (this.audioPlayerInstance == null) {
            if (authProvider) this.audioPlayerInstance = new AudioPlayer(authProvider);
            else this.audioPlayerInstance = new AudioPlayer();
            return this.audioPlayerInstance;
        }
        return null;
    }

    public init(): void {
        this.client = MainAuthManager.getBotClient();
        this.player = new Player(this.client, {
            ytdlOptions: {
                quality: 'highestaudio',
                // eslint-disable-next-line no-bitwise
                highWaterMark: 1 << 25,
            },
        });
        this.tracksList = new TracksQueue(this.player);
    }

    public connect(
        guild: GuildResolvable,
        channel: ChannelResolvable,
        memberChannel: GuildChannelResolvable,
    ): void {
        this.tracksList.initQueue(guild, channel, memberChannel);
        this.tracksList.getQueue().connect(channel as GuildChannelResolvable);
    }

    public async queryKeywords(url: string, user: UserResolvable): Promise<Track> {
        let track: Track;
        const result = await this.player.search(url, {
            requestedBy: user,
            searchEngine: QueryType.AUTO,
        }).then((response) => {
            this.cacheResult.pushToCache(response);
            track = this.cacheResult.getTopCache();
        });
        return track;
    }

    public updateStatus(status?: boolean): boolean {
        if (status) this.isPlaying = status;
        else this.isPlaying = this.tracksList.getQueue().playing;
        this.consoleLogger.sendInformationLog(`Audio Playing: ${this.isPlaying}`);
        return this.isPlaying;
    }

    public addToQueue(track: Track): void {
        this.tracksList.addQueue(track);
    }

    public async play(): Promise<void> {
        if (!this.isPlaying) {
            this.addToQueue(this.cacheResult.getTopCache());
            await this.tracksList.getQueue().play();
        } else this.addToQueue(this.cacheResult.getTopCache());
    }

    public stop(): void {
        if (this.isPlaying) this.tracksList.getQueue().stop();
    }

    public getPlayer(): Player {
        return this.player;
    }

    // public createQueue(
    //     guild: GuildResolvable,
    //     channel: ChannelResolvable,
    //     memberChannel: GuildChannelResolvable,
    // ) {
    //     this.queue = this.player.createQueue(guild, {
    //         metadata: {
    //             // eslint-disable-next-line object-shorthand
    //             channel: channel,
    //         },
    //     });
    //     this.queue.connect(memberChannel);
    // }

    // public async queryTracks(url: string, user: UserResolvable): Promise<Track> {
    //     let track: Track;
    //     const result = await this.player.search(url, {
    //         requestedBy: user,
    //         searchEngine: QueryType.AUTO,
    //     }).then((response) => {
    //         this.cacheResult = response;
    //         track = this.getFirstResult();
    //     });

    // public addQueue(track: Track) {
    //     this.queue.addTrack(track);
    // }

    // public async playMusic(track: Track) {
    //     this.queue.addTrack(track);
    //     if (this.queue.playing) await this.queue.play();
    // }

    // public getFirstResult(): Track {
    //     if (this.cacheResult) return this.cacheResult.tracks[0];
    //     return undefined;
    // }

    // public getResultCache(): PlayerSearchResult {
    //     return this.cacheResult;
    // }

}
