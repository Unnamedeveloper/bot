const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let shutdownTimer;

// Function to reset the shutdown timer
function resetShutdownTimer() {
  if (shutdownTimer) clearTimeout(shutdownTimer);
  shutdownTimer = setTimeout(() => {
    console.log("No activity for 60 seconds. Shutting down...");
    client.destroy(); // Gracefully shut down the bot
  }, 60000); // 60 seconds
}

// When the bot is ready, log to console
client.once('ready', () => {
  console.log('Bot is online!');
  resetShutdownTimer(); // Start shutdown timer when bot is ready
});

// Listen for slash commands
client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    resetShutdownTimer(); // Reset timer on each command
    await interaction.reply('Command received!');
  }
});

// Login to Discord with the token
client.login(TOKEN).then(resetShutdownTimer);
