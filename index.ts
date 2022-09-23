import DiscordJS ,{ messageLink, GatewayIntentBits, Message } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config();

const client =  new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

client.on('ready', () => {
    console.log('Bot Ready')
})

client.on('messageCreate', (message) => {
    if(message.channel.id = '1022891851939852358') {
        if(message.content == 'ping') {
            message.reply ({
                content: 'hello world'
            })
        }
    }
})

client.login(process.env.TOKEN)


