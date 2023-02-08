import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commandList } from '@/events/commands/CommandList';

import { MemoAuthManager as MainAuthProvider } from '@/Memo';
import AuthManager from '@/utils/AuthManager';
import CommandOperator from '@/events/commands/CommandOperator';

export default class Loader {

    private authProvider: AuthManager;

    public constructor(authProvider?: AuthManager) {
        if (authProvider) this.authProvider = authProvider;
        else this.authProvider = MainAuthProvider; // If not set, default to Main Auth Provider
    }

    public async load(bot: Client, botToken?: string, guildId?: string) {
        this.authProvider.setClient(bot);

        let token: string;
        if (botToken) {
            token = botToken;
        } else {
            token = this.authProvider.getBotToken();
        }

        let guild: string;
        if (guildId) {
            guild = guildId;
        } else {
            guild = this.authProvider.getGuildId();
        }

        const commandOps = new CommandOperator();
        const commandData = commandOps.createCommandJson();
        const rest = new REST({ version: '9' }).setToken(token);

        await rest.put(Routes.applicationGuildCommands(bot.user?.id, guild), {
            body: commandData,
        });

    }

    public async reload(bot?: Client, botToken?: string, guildId?: string) {
        let client: Client;
        if (!bot) {
            client = this.authProvider.getBotClient();
        } else {
            client = bot;
        }

        let token: string;
        if (botToken) {
            token = botToken;
        } else {
            token = this.authProvider.getBotToken();
        }

        let guild: string;
        if (guildId) {
            guild = guildId;
        } else {
            guild = this.authProvider.getGuildId();
        }

        const rest = new REST({ version: '9' }).setToken(token);
        await rest.put(Routes.applicationGuildCommands(bot.user?.id, guild), {
            body: [],
        }).then(async () => {
            await this.load(client);
        });
    }

}
