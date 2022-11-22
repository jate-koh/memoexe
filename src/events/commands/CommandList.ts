import { Command } from '@/events/commands/Command';
import Phasmo from '@/events/commands/listing/Phasmo';

const phasmo = new Phasmo();

export const commandList: Command[] = [phasmo];
