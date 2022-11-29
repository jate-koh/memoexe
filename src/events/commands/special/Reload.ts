/* eslint-disable consistent-return */
import {
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import glob from 'glob';
import { commandList, specialCommandList } from '@/events/commands/CommandList';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import Loader from '@/events/Loader';
import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

export default class Reload extends SpecialCommand {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload all bot commands');

    public run = async (interaction: CommandInteraction, auth: AuthManager) => {
        this.consoleLogger.sendInformationLog('Reloading Commands...');

        const { user } = interaction;
        const totalAmount: number = commandList.length + specialCommandList.length;
        const reloader = new Loader(auth);
        const embedReload = new EmbedBuilder();
        embedReload.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });

        await interaction.reply({ content: 'Reloading... please wait...' });
        await interaction.editReply({ content: `Found ${totalAmount} command(s)` });

        try {
            let amount = 0;
            glob(`${__dirname}/../**/*.js`, async (error, filePath) => {
                this.fileIteration(error, filePath).then(async (number) => {
                    amount = number;
                    this.consoleLogger.sendInformationLog('Initialiser: Reinitlising Bot...');
                    await reloader.reload(auth.getBotClient()).then(() => {
                        this.consoleLogger.sendInformationLog('Initialiser: Bot Reinitialiser: Success');
                        embedReload.setTitle('**Reloaded**');
                        embedReload.setDescription(`Found total of ${totalAmount} command(s)\nTotal of ${amount} files(s) reloaded`);
                    });
                    await interaction.editReply({ content: '', embeds: [embedReload] });
                });
            });
        } catch (error) {
            embedReload.setTitle('**Reload Failed**');
            this.consoleLogger.sendErrorLog('Reload Failed');
        }

        // await interaction.editReply({ embeds: [embedReload] });
    };

    public async fileIteration(error: Error, filePath: string[]): Promise<number> {
        if (error) {
            this.consoleLogger.sendErrorLog('Command Files Iteration Failed');
            return 0;
        }

        let amount = 0;
        filePath.forEach((file) => {
            this.consoleLogger.sendInformationLog(`Reloading ${file}`);
            delete require.cache[require.resolve(file)];
            amount += 1;
        });

        return amount;
    }

}
