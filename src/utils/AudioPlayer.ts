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
import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

export default class AudioPlayer {

    private static audioPlayerInstance: AudioPlayer;
    private client: Client = undefined;
    private player: Player = undefined;
    private queue: Queue = undefined;
    private consoleLogger = new ConsoleLogger(this.constructor.name);
    private cacheResult: PlayerSearchResult = undefined;

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
        this.player = new Player(this.client);
    }

    public createQueue(
        guild: GuildResolvable,
        channel: ChannelResolvable,
        memberChannel: GuildChannelResolvable,
    ) {
        this.queue = this.player.createQueue(guild, {
            metadata: {
                // eslint-disable-next-line object-shorthand
                channel: channel,
            },
        });
        this.queue.connect(memberChannel);
    }

    public async searchYouTube(url: string, user: UserResolvable): Promise<Track> {
        let track: Track;
        const result = await this.player.search(url, {
            requestedBy: user,
            searchEngine: QueryType.YOUTUBE_SEARCH,
        }).then((response) => {
            this.cacheResult = response;
            track = this.getFirstResult();
        });

        return track;
    }

    public async playMusic(track: Track) {
        this.queue.addTrack(track);
        await this.queue.play(track);
    }

    public nowPlaying(track: Track): void {
        this.queue.play(track);
    }

    public getFirstResult(): Track {
        if (this.cacheResult) return this.cacheResult.tracks[0];
        return undefined;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getResultCache(): PlayerSearchResult {
        return this.cacheResult;
    }

}
