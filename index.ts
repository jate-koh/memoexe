import DiscordJS ,{ messageLink, GatewayIntentBits, Message } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config();

const prefix = '!'

const client =  new DiscordJS.Client({
    allowedMentions: {
        parse: [`users`,`roles`],
        repliedUser: true,
    },
    intents: [
        "Guilds",
        "GuildMessages",
        //"GuildPresences",
        //"GuildMembers",
        //"GuildMessageReactions"
    ],
})

client.on('ready', () => {
    console.log('Bot Ready')
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'ping') {
        message.channel.send('The bot is currently working properly!')
    }

})

client.login(process.env.TOKEN)


