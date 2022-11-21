import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import Initializer from "./events/Initializer";
import AuthManager from "./utils/AuthManager";
import { getFormatDate } from "./utils/DateTimeProvider";

export default class Memo {
    
    private authManager = new AuthManager();
    private initializer = new Initializer(this.authManager);

    public constructor(
        botToken: string,
        guildId: string
    ) {
        this.authManager.setBotToken(botToken);
        this.authManager.setGuildId(guildId);
        
        try {
            //this.auth();
            this.run();
        } catch (error) {
            throw new Error(`${this.constructor.name} [${getFormatDate()}]: Failed to start the bot.`);
        }
    }

    public async auth() {

    }

    public async run() {
        const bot = new Client({ intents: IntentOptions});

        try {
            await bot.login(this.authManager.getBotToken());
            console.log(`${this.constructor.name} [${getFormatDate()}]: Bot logged in.`);
        } catch (error) {
            throw new Error(`${this.constructor.name} [${getFormatDate()}]: Bot failed to log in.`);
        }

        bot.on('ready', async () => {
            try {
                await this.initializer.onReady(bot);
            } catch (error) {
                throw new Error(
                    `${this.constructor.name}: Failed to initialize settings`
                  );
            }
            console.log(`${this.constructor.name} [${getFormatDate()}]: Bot initialized. Bot is ready.`);
        });
    }
}