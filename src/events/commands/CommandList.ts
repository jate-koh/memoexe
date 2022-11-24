import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import Phasmo from '@/events/commands/generic/Phasmo';
import Version from '@/events/commands/generic/Version';
import Reload from '@/events/commands/special/Reload';

const phasmo = new Phasmo();
const version = new Version();
const reload = new Reload();

export const commandList: GenericCommand[] = [phasmo, version];

export const specialCommandList: SpecialCommand[] = [reload];
