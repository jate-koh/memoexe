import dotenv from 'dotenv';
import Memo from '@/Memo';

dotenv.config();

const botToken = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;

const memo = new Memo(botToken, guildId);
