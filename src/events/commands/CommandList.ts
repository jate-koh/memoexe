import { Command } from '@/events/commands/Command';
import Phasmo from '@/events/commands/listing/Phasmo';
import Version from '@/events/commands/listing/Version';
import Test from '@/events/commands/listing/Test';
import Play from '@/events/commands/listing/Play';

export const commandList: Command[] = [
    new Phasmo(),
    new Version(),
    new Test(),
    new Play(),
];
