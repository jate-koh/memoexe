import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import ConsoleLogger from '@/utils/ConsoleLogger';

export default class Phasmo extends GenericCommand {

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public data = new SlashCommandBuilder()
        .setName('phasmo')
        .setDescription('Invite your friend to play Phasmo');

    public run = async (interaction: CommandInteraction) => {
        this.consoleLogger.sendInformationLog('Running Command...');

        // interaction.deferReply();
        const { user } = interaction;

        const amount: number = Math.floor(Math.random() * 50) + 1;
        const text = 'Phasmo กันเปล่า';
        let statement = '';
        for (let i = 0; i < amount; i++) {
            statement = statement.concat(text, ' ');
        }

        const TestEmbed = new EmbedBuilder();
        TestEmbed.setTitle(`**Phasmo กันใหม** (x${amount})`);
        TestEmbed.setDescription(`${statement}`);
        TestEmbed.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });

        // await interaction.editReply({ embeds: [TestEmbed] });

        await interaction.reply({ embeds: [TestEmbed] });
    };

}
