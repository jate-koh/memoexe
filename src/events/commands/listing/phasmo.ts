import { constants } from 'buffer';
import { CommandInteraction } from 'discord.js';
import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';
import { Command } from '../Command';

export default class phasmo implements Command {
  public data = new SlashCommandBuilder()
    .setName('phasmo')
    .setDescription('Invite your friend to play Phasmo');

  public run = async (interaction: CommandInteraction) => {
    console.log(`${this.constructor.name}: Running Command....`);

    // interaction.deferReply();
    const { user } = interaction;

    let amount: number= Math.floor(Math.random() * 314) + 1;
    let text: string = `Phasmo กันเปล่า`
    var statement: string = ``;
    for(var i = 0; i < amount; i++) {
      statement = statement.concat(text, " ");
    }

    const TestEmbed = new EmbedBuilder();
    TestEmbed.setTitle(`**Phasmo กันใหม** (x${amount})`);
    TestEmbed.setDescription(statement);
    TestEmbed.setAuthor({
    name: user.username,
    iconURL: user.displayAvatarURL(),
    });

    //await interaction.editReply({ embeds: [TestEmbed] });

    await interaction.reply({embeds: [TestEmbed]});
  }
}
