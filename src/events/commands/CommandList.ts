import { Command } from './Command';
import phasmo from './listing/phasmo';

const Phasmo = new phasmo();

export const commandList: Command[] = [Phasmo];
