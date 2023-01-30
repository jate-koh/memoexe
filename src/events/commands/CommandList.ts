import { GenericCommand } from '@/events/commands/generic/GenericCommand';
import { SpecialCommand } from '@/events/commands/special/SpecialCommand';
import Phasmo from '@/events/commands/generic/Phasmo';
import Version from '@/events/commands/generic/Version';
import Reload from '@/events/commands/special/Reload';
import Test from '@/events/commands/generic/Test';
import Play from '@/events/commands/generic/Play';

const phasmo = new Phasmo(); const version = new Version(); const play = new Play();
const test = new Test();
//const reload = new Reload();

export const commandList: GenericCommand[] = [phasmo, version, test, play];

export const specialCommandList: SpecialCommand[] = [];
