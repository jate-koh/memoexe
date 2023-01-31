import { Command } from '@/events/commands/Command';
import Phasmo from '@/events/commands/listing/Phasmo';
import Version from '@/events/commands/listing/Version';
import Test from '@/events/commands/listing/Test';
import Play from '@/events/commands/listing/Play';

const phasmo = new Phasmo(); const version = new Version(); const play = new Play();
const test = new Test();
//const reload = new Reload();

export const commandList: Command[] = [phasmo, version, test, play];
