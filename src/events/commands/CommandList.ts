import { Command } from '@/events/commands/Command';
import phasmo from '@/events/commands/listing/phasmo';

const Phasmo = new phasmo();

export const commandList: Command[] = [Phasmo];
