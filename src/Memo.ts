import { Client } from 'discord.js';

import { IntentOptions } from '@/config/IntentOptions';

import Initializer from '@/events/Initializer';
import AuthManager from '@/utils/AuthManager';
import ConsoleLogger from '@/utils/ConsoleLogger';
import InteractionManager from '@/events/InteractionManager';

export default class Memo {

    private authManager = new AuthManager();
    private consoleLogger = new ConsoleLogger(this.constructor.name);
    private initializer = new Initializer(this.authManager);
    private interactionManager = new InteractionManager();

    public constructor(
        botToken: string,
        guildId: string,
    ) {
        this.authManager.setBotToken(botToken);
        this.authManager.setGuildId(guildId);

        try {
            this.auth();
            this.run();
        } catch (error) {
            throw this.consoleLogger.getError('Start bot: failed');
        }
    }

    public async auth() {
        if (!this.authManager.validateGuildId() || !this.authManager.validateToken()) throw this.consoleLogger.getError('Bot Authentication: failed');
        else this.consoleLogger.sendInformationLog('Bot Authentication: Success');
    }

    public async run() {
        const bot = new Client({ intents: IntentOptions });

        try {
            await bot.login(this.authManager.getBotToken());
            this.consoleLogger.sendInformationLog('Bot Login: Success');
        } catch (error) {
            throw this.consoleLogger.getError('Bot Login: Failed');
        }

        /* Bot Ready State */
        bot.on('ready', async () => {
            try {
                await this.initializer.onReady(bot);
                this.consoleLogger.sendInformationLog('Bot Initialiser: Success');
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
