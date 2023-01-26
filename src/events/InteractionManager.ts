import { Interaction } from 'discord.js';

import ConsoleLogger from '@/utils/ConsoleLogger';
import AuthManager from '@/utils/AuthManager';

import { InteractionState } from '@/events/InteractionState';
import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from './commands/special/SpecialCommand';
import CommandOperator from '@/events/commands/CommandOperator';

export default class InteractionManager {

    private static interactionManagerInstance: InteractionManager;
    private interactionEvent: Interaction = undefined;
    private interactionState: InteractionState = undefined;
    private authProvider: AuthManager = undefined;

    private consoleLogger = new ConsoleLogger(this.constructor.name);

    private constructor(authProvider?: AuthManager) {
        if (authProvider) {
            this.authProvider = authProvider;
        }
    }

    public static getInteractionInstance(): InteractionManager | null {
        if (this.interactionManagerInstance == null) {
            const interactionInstance = new InteractionManager();
            return interactionInstance;
        }
        return null;
    }

    public async onInteraction(interaction: Interaction) {
        if (interaction.isCommand()) {
            this.consoleLogger.sendInformationLog('Command Interaction Detected.');
            this.setInteraction(interaction);
            this.setInteractionState(InteractionState.COMMAND);

            const commandOps = new CommandOperator();
            const { user } = interaction;
            const command = commandOps.lookupCommand(interaction);

            // Log Command Info and User who invoked command.
            if (command) {
                this.consoleLogger.sendInformationLog(`
                User ${user.username} (${user.tag}): 
                Invoked: ${interaction.commandName} in ${interaction.channel}`);
            }

            // If command is in Special Commands Listing
            if (command instanceof SpecialCommand) {
                this.consoleLogger.sendInformationLog('Special Command Detected');
                if (this.authProvider) command.run(interaction, this.authProvider);
                else this.consoleLogger.sendErrorLog('Auth Manager not provided');

            // If command is in Generic Commands Listing
            } else if (command instanceof GenericCommand) {
                this.consoleLogger.sendInformationLog('Generic Command Detected');
                command.run(interaction);

            // Unidentified Commands
            } else {
                this.consoleLogger.sendErrorLog('Command not found in the listing.');
            }

        } else {
            this.consoleLogger.sendErrorLog('Unknown Interaction Detected.');
        }
    }

    public setAuthProvider(authProvider: AuthManager): void {
        this.authProvider = authProvider;
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
