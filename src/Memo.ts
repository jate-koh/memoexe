import { Client } from 'discord.js';
import { Player } from 'discord-player';

import { IntentOptions } from '@/config/IntentOptions';
import Loader from '@/events/Loader';
import AuthManager from '@/utils/AuthManager';
import ConsoleLogger from '@/utils/ConsoleLogger';
import InteractionManager from '@/events/InteractionManager';
import AudioPlayer from '@/utils/AudioPlayer';

// Auth Manager and Interaction Manager can be instantiated once.
export const MemoAuthManager            = AuthManager.getAuthInstance();
export const MemoInteractionManager     = InteractionManager.getInteractionInstance();
export const MemoPlayer                 = AudioPlayer.getAudioPlayerInstance();
export default class Memo {

    private consoleLogger       = new ConsoleLogger(this.constructor.name);
    private loader              = new Loader(MemoAuthManager);

    public constructor(botToken: string, guildId: string) {

        // Initialize Auth Manager and Interaction Manager
        MemoAuthManager.setBotToken(botToken);
        MemoAuthManager.setGuildId(guildId);
        MemoInteractionManager.setAuthProvider(MemoAuthManager);

        try {
            this.auth();
            this.run();
        } catch (error) {
            throw this.consoleLogger.getError('Start bot: failed');
        }
    }

    public async auth() {
        if (!MemoAuthManager.doAuth(false)) throw this.consoleLogger.getError('Bot Authentication: failed');
        else this.consoleLogger.sendInformationLog('Bot Authentication: Success');
    }

    public async run() {
        const bot = new Client({ intents: IntentOptions });

        /** Bot Login Stage */
        try {
            MemoAuthManager.setClient(bot);
            await bot.login(MemoAuthManager.getBotToken());
            this.consoleLogger.sendInformationLog('Bot Login: Success');
        } catch (error) {
            throw this.consoleLogger.getError('Bot Login: Failed');
        }

        /* Bot Player Initialise Stage */
        try {
            MemoPlayer.init();
            const player: Player = MemoPlayer.getPlayer();

            player.on('trackStart', (queue, track) => MemoPlayer.nowPlaying(track));
            //player.on('error', (error) => { console.log(error); });
            //player.on('connectionError', (error) => { console.log(error); });

            this.consoleLogger.sendInformationLog('Bot Player Initialiser: Success');
        } catch (error) {
            throw this.consoleLogger.getError('Bot Player Initialiser: Failed');
        }

        /* Bot Engine Initialise Stage */
        bot.once('ready', async () => {
            try {
                await this.loader.load(bot).then(() => {
                    this.consoleLogger.sendInformationLog('Bot Engine Initialiser: Success');
                });
            } catch (error) {
                throw this.consoleLogger.getError('Bot Engine Initialiser: Failed');
            }
        });

        /* Bot Listening Stage */
        bot.on('interactionCreate', async (interaction) => {
            try {
                await MemoInteractionManager.onInteraction(interaction);
            } catch (error) {
                this.consoleLogger.sendErrorLog('Interaction Manager: Error Occured');
            }
        });
    }

}
