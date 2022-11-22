import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commandList } from '@/events/commands/CommandList';
import AuthManager from '@/utils/AuthManager';

export default class Initializer {
    private authProvider: AuthManager;

    private botToken: string = undefined;
    private guildId: string = undefined;
  
    public constructor(authProvider: AuthManager) {
      this.authProvider = authProvider;
    }
  
    public async onReady(bot: Client, botToken?: string, guildId?: string) {
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
  
      await rest.put(Routes.applicationGuildCommands(bot.user?.id, guild), {
        body: commandData,
      });
    }
}