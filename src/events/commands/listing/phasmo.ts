import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { Command } from '@/events/commands/Command';

export default class Phasmo implements Command {
    public data = new SlashCommandBuilder()
        .setName('phasmo')
        .setDescription('Invite your friend to play Phasmo');

    public run = async (interaction: CommandInteraction) => {
        console.log(`${this.constructor.name}: Running Command....`);

        // interaction.deferReply();
        const { user } = interaction;

        const amount: number = Math.floor(Math.random() * 314) + 1;
        const text = 'Phasmo กันเปล่า';
        let statement = '';
        for (let i = 0; i < amount; i += 1) {
            statement = statement.concat(text, ' ');
        }

        const TestEmbed = new EmbedBuilder();
        TestEmbed.setTitle(`**Phasmo กันใหม** (x${amount})`);
        TestEmbed.setDescription(statement);
        TestEmbed.setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        });

        // await interaction.editReply({ embeds: [TestEmbed] });

        await interaction.reply({ embeds: [TestEmbed] });
    };
}
