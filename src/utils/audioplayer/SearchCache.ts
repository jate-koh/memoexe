import {
    Player, PlayerSearchResult, QueryType, Queue, Track,
} from 'discord-player';
import {
    ChannelResolvable, Client, CommandInteraction,
    GuildChannel,
    GuildChannelResolvable,
    GuildResolvable, UserResolvable,
} from 'discord.js';

import { MemoPlayer as MainPlayer, MemoAuthManager as MainAuthManager } from '@/Memo';
import ConsoleLogger from '@/utils/loggers/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

export default class SearchCache {

    private cache: PlayerSearchResult = undefined;
    private consoleLogger: ConsoleLogger = new ConsoleLogger('Search Cache');

    public pushToCache(cache: PlayerSearchResult): void {
        this.cache = cache;
    }

    public getTopCache(): Track | undefined {
        if (this.cache) return this.cache.tracks[0];
        this.consoleLogger.sendWarningLog('Empty Cache, Returning Undefined');
        return undefined;
    }

    public getCache(): PlayerSearchResult | undefined {
        if (this.cache) return this.cache;
        this.consoleLogger.sendWarningLog('Empty Cache, Returning Undefined');
        return undefined;
    }

    public clearCache(): void {
        this.cache = undefined;
    }

}
