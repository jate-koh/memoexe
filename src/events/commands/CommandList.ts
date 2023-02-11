import { Command } from '@/events/commands/Command';
import Phasmo from '@/events/commands/common/Phasmo';
import Version from '@/events/commands/common/Version';
import Test from '@/events/commands/common/Test';
import Play from '@/events/commands/common/Play';

export const commandList: Command[] = [
    new Phasmo(),
    new Version(),
    new Test(),
    new Play(),
];
