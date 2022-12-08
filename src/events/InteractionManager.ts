import { Interaction } from 'discord.js';

import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

import { InteractionState } from '@/events/InteractionState';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from './commands/special/SpecialCommand';
import CommandOperator from '@/events/commands/CommandOperator';

export default class InteractionManager {

    private interactionEvent: Interaction = undefined;
    private interactionState: InteractionState = undefined;
    private authManager: AuthManager = undefined;

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    public constructor(authProvider: AuthManager) {
        this.authManager = authProvider;
    }

    public async onInteraction(interaction: Interaction) {
        if (interaction.isCommand()) {
            this.consoleLogger.sendInformationLog('Command Interaction Detected.');
            this.setInteraction(interaction);
            this.setInteractionState(InteractionState.COMMAND);

            const commandOps = new CommandOperator();
            const { user } = interaction;
            const command = commandOps.lookupCommand(interaction);

            if (command) {
                this.consoleLogger.sendInformationLog(`
                User ${user.username} (${user.tag}): 
                Invoked: ${interaction.commandName} in ${interaction.channel}`);
            }

            if (command instanceof SpecialCommand) {
                this.consoleLogger.sendInformationLog('Special Command Detected');
                command.run(interaction, this.authManager);
            } else if (command instanceof GenericCommand) {
                this.consoleLogger.sendInformationLog('Generic Command Detected');
                command.run(interaction);
            } else {
                this.consoleLogger.sendErrorLog('Command not found in the listing.');
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
