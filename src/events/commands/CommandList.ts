import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import Phasmo from '@/events/commands/generic/Phasmo';
import Version from '@/events/commands/generic/Version';
import Reload from '@/events/commands/special/Reload';
import Test from '@/events/commands/generic/Test';

const phasmo = new Phasmo();
const version = new Version();
//const reload = new Reload();
const test = new Test();

export const commandList: GenericCommand[] = [phasmo, version, test];

export const specialCommandList: SpecialCommand[] = [];
