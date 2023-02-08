import {
    Player, PlayerSearchResult, QueryType, Queue, Track,
} from 'discord-player';
import {
    ChannelResolvable, Client, CommandInteraction,
    GuildResolvable, UserResolvable,
} from 'discord.js';

import { MemoAuthManager as MainAuthManager } from '@/Memo';
import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

export default class AudioPlayer {

    private client: Client = MainAuthManager.getBotClient();
    private player: Player = undefined;
    private queue: Queue = undefined;
    private consoleLogger = new ConsoleLogger(this.constructor.name);
    private cacheResult: PlayerSearchResult = undefined;

    public constructor(authProvider?: AuthManager) {
        if (authProvider) this.client = authProvider.getBotClient();

        // If not set, default to Main Auth Provider
        else this.client = MainAuthManager.getBotClient();

        this.init();
    }

    public init(): void {
        this.player = new Player(this.client);
    }

    public createQueue(guild: GuildResolvable, channel: ChannelResolvable) {
        this.queue = this.player.createQueue(guild, {
            metadata: {
                // eslint-disable-next-line object-shorthand
                channel: channel,
            },
        });
    }

    public async queryYouTubeMusic(url: string, user: UserResolvable): Promise<Track> {
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

    public getFirstResult(): Track {
        if (this.cacheResult) return this.cacheResult.tracks[0];
        return undefined;
    }

    public playMusic(track: Track) {
        this.queue.play(track);
    }

    public getResultCache(): PlayerSearchResult {
        return this.cacheResult;
    }

}
