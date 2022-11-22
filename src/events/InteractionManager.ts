import { Interaction } from 'discord.js';
import { InteractionState } from '@/events/InteractionState';
import { commandList } from '@/events/commands/CommandList';
import ConsoleLogger from '@/utils/ConsoleLogger';

export default class InteractionManager {

    private interactionEvent: Interaction = undefined;
    private interactionState: InteractionState = undefined;

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public async onInteraction(interaction: Interaction) {
        if (interaction.isCommand()) {
            this.consoleLogger.sendInformationLog('Command Interaction Detected.');
            this.setInteraction(interaction);
            this.setInteractionState(InteractionState.COMMAND);
            //console.log(`${this.constructor.name}: User invoked: '${interaction.commandName}'`);

            for (const Command of commandList) {
                //console.log(Command);
                if (interaction.commandName === Command.data.name) {
                    try {
                        await Command.run(interaction);
                    } catch (error) {
                        this.consoleLogger.sendErrorLog(`
                            Command Interaction: Failed to Execute ${interaction.commandName}
                        `);
                    }
                    break;
                } else {
                    this.consoleLogger.sendErrorLog(`
                        Command Interaction: Can't find any ${interaction.commandName} in the listings.
                    `);
                }
            }
        } else {
            this.consoleLogger.sendErrorLog('Unknown Interaction Detected.');
        }
    }

    public getInteraction(): Interaction {
        return this.interactionEvent;
    }

    public setInteraction(interaction: Interaction): void {
        this.interactionEvent = interaction;
    }

    public getInteractionState(): InteractionState {
        return this.interactionState;
    }

    public setInteractionState(interactionState: InteractionState): void {
        this.interactionState = interactionState;
    }

}
