import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commandList, specialCommandList } from '@/events/commands/CommandList';
import AuthManager from '@/utils/AuthManager';

export default class Loader {

    private authProvider: AuthManager;

    public constructor(authProvider: AuthManager) {
        this.authProvider = authProvider;
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

        const rest = new REST({ version: '9' }).setToken(token);
        const commandData = commandList.map((command) => command.data.toJSON());
        const specialCommandData = specialCommandList.map((command) => command.data.toJSON());

        specialCommandData.forEach((command) => {
            commandData.push(command);
        });

        await rest.put(Routes.applicationGuildCommands(bot.user?.id, guild), {
            body: commandData,
        });

    }

    public async reload(bot: Client, botToken?: string, guildId?: string) {
        let client: Client;
        if (!bot) {
            client = this.authProvider.getBotClient();
        } else {
            client = bot;
        }

        this.load(bot);
    }

}
