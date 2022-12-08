import { Client } from 'discord.js';

export default class AuthManager {

    private botToken: string = undefined;
    private mongoUrl: string = undefined;
    private guildId: string = undefined;
    private botClient: Client = undefined;

    public constructor(botClient?: Client) {
        if (botClient) {
            this.botClient = botClient;
        }
    }

    /**
   * Verify all Bot Token, MongoDB Url (if this bot required database), and Guild ID
   * @param requireDatabase set to true if this bot use database (Default is false)
   * @returns false: if authentication and verification process failed,
   * see error logs for details.
   * true: if verification process is successful.
   */
    public doAuth(requireDatabase?: boolean | false): boolean {
        if (!this.validateToken) {
            return false;
        }
        if (requireDatabase) {
            if (!this.validateMongo) {
                return false;
            }
        }
        if (!this.validateGuildId) {
            return false;
        }
        return true;
    }

    private validateToken(): boolean {
        if (!this.botToken) {
            console.error(`${this.constructor.name}: Missing discord bot token!`);
            return false;
        }
        return true;
    }

    private validateMongo(): boolean {
        if (!this.mongoUrl) {
            console.error(`${this.constructor.name}: Missing MongoDB URL!`);
            return false;
        }
        return true;
    }

    private validateGuildId(): boolean {
        if (!this.guildId) {
            console.error(`${this.constructor.name}: Missing Server ID!`);
            return false;
        }
        return true;
    }

    public setClient(botClient: Client): void {
        this.botClient = botClient;
    }

    public setBotToken(botToken: string): void {
        this.botToken = botToken;
    }

    public setMongoUrl(mongoUrl: string): void {
        this.mongoUrl = mongoUrl;
    }

    public setGuildId(guildId: string): void {
        this.guildId = guildId;
    }

    public getBotClient(): Client {
        return this.botClient;
    }

    public getBotToken(): string {
        return this.botToken;
    }

    public getMongoUrl(): string {
        return this.mongoUrl;
    }

    public getGuildId(): string {
        return this.guildId;
    }

}
