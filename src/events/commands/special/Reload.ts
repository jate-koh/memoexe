import {
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
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
        const amount: number = commandList.length + specialCommandList.length;
        const reloader = new Loader(auth);
        const embedReload = new EmbedBuilder();
        embedReload.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });

        await interaction.reply({ content: 'Reloading... please wait...' });
        //console.log(auth.getBotClient())

        try {
            reloader.reload(auth.getBotClient());
            embedReload.setTitle('**Commands Reloaded**');
            embedReload.setDescription(`Total of ${amount} Command(s) reloaded`);
        } catch (error) {
            embedReload.setTitle('**Command Reload Failed**');
            this.consoleLogger.sendErrorLog('Reload Failed');
        }

        // await interaction.editReply({ embeds: [embedReload] });
        await interaction.editReply({ content: '', embeds: [embedReload] });
    };

}
