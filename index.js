const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

// Login using the token from the environment variable
client.login(process.env.TOKEN);
