const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

let shutdownTimer;

function resetShutdownTimer() {
  if (shutdownTimer) clearTimeout(shutdownTimer);
  shutdownTimer = setTimeout(() => {
    console.log("No activity for 60 seconds. Shutting down...");
    client.destroy();  // Disconnect the bot
    process.exit();    // Exit the workflow
  }, 60000);  // 60 seconds
}

client.once('ready', () => {
  console.log('Bot is online!');
  resetShutdownTimer();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const commandName = `/${interaction.commandName}`;
  const allowedCommands = ['/ban'];

  if (allowedCommands.includes(commandName)) {
    resetShutdownTimer();  // Reset the shutdown timer on command
    await interaction.reply(`Command ${commandName} received!`);
  }
});

client.login(TOKEN).then(resetShutdownTimer);
