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

export default class TracksQueue {

    private queue: Queue;
    private player: Player;

    public constructor(player?: Player) {
        if (player) this.player = player;

        // If not set, default to Main Audio Player
        else this.player = MainPlayer.getPlayer();
    }

    public initQueue(
        guild: GuildResolvable,
        channel: ChannelResolvable,
        memberChannel: GuildChannelResolvable,
    ): void {
        this.queue = this.player.createQueue(guild, {
            metadata: {
                // eslint-disable-next-line object-shorthand
                channel: channel,
            },
        });
    }

    public destroyQueue(guild: GuildResolvable): void {
        this.player.deleteQueue(guild);
    }

    public addQueue(track: Track): void {
        this.queue.addTrack(track);
    }

    public removeQueue(track?: Track, num?: number, name?: string): void {
        if (track) this.queue.remove(track);
        else if (num) this.queue.remove(num);
        else if (name) this.queue.remove(name);
        else this.queue.remove(0);
    }

    public clearQueue(): void {
        this.queue.clear();
    }

    public getQueue(): Queue {
        return this.queue;
    }

}
