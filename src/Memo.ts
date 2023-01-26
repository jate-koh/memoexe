import { Client } from 'discord.js';
import { Player } from 'discord-player';

import { IntentOptions } from '@/config/IntentOptions';
import Loader from '@/events/Loader';
import AuthManager from '@/utils/AuthManager';
import ConsoleLogger from '@/utils/ConsoleLogger';
import InteractionManager from '@/events/InteractionManager';

export default class Memo {

    // Auth Manager and Interaction Manager can be instantiated once
    private authManager         = AuthManager.getAuthInstance();
    private interactionManager  = InteractionManager.getInteractionInstance();

    private consoleLogger       = new ConsoleLogger(this.constructor.name);
    private loader              = new Loader(this.authManager);

    public constructor(botToken: string, guildId: string) {

        // Initialize Auth Manager and Interaction Manager
        this.authManager.setBotToken(botToken);
        this.authManager.setGuildId(guildId);
        this.interactionManager.setAuthProvider(this.authManager);

        try {
            this.auth();
            this.run();
        } catch (error) {
            throw this.consoleLogger.getError('Start bot: failed');
        }
    }

    public async auth() {
        if (!this.authManager.doAuth(false)) throw this.consoleLogger.getError('Bot Authentication: failed');
        else this.consoleLogger.sendInformationLog('Bot Authentication: Success');
    }

    public async run() {
        const bot = new Client({ intents: IntentOptions });
        //const player = new Player(bot);

        this.authManager.setClient(bot);
        try {
            await bot.login(this.authManager.getBotToken());
            this.consoleLogger.sendInformationLog('Bot Login: Success');
        } catch (error) {
            throw this.consoleLogger.getError('Bot Login: Failed');
        }

        /* Bot Ready State */
        bot.on('ready', async () => {
            try {
                await this.loader.load(bot).then(() => {
                    this.consoleLogger.sendInformationLog('Bot Initialiser: Success');
                });
            } catch (error) {
                throw this.consoleLogger.getError('Bot Initialiser: Failed');
            }
        });

        /* Bot Listening State */
        bot.on('interactionCreate', async (interaction) => {
            try {
                await this.interactionManager.onInteraction(interaction);
            } catch (error) {
                this.consoleLogger.sendErrorLog('Interaction Manager: Error Occured');
            }
        });
    }

}
