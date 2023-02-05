import { Player } from 'discord-player';
import { Client } from 'discord.js';

import { MemoAuthManager as MainAuthManager } from '@/Memo';
import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

export default class AudioPlayer {

    private client: Client = MainAuthManager.getBotClient();
    private player: Player = undefined;
    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public constructor(authProvider?: AuthManager) {
        if (authProvider) this.client = authProvider.getBotClient();
        else this.client = MainAuthManager.getBotClient();
        this.init();
    }

    public init() {
        this.player = new Player(this.client);
    }

}
