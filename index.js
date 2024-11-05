// require('dotenv').config(); // Remove this line in GitHub Actions

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

// Use process.env.TOKEN for the bot login
client.login(process.env.TOKEN).catch(err => console.error("Failed to login:", err));
