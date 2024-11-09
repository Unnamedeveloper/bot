const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Function to log allowed commands to the website
async function logCommandToWebsite(command) {
  try {
    await axios.post('https://topaz-aluminum-somersault.glitch.me', { command });
    console.log(`Logged command: ${command}`);
  } catch (error) {
    console.error("Error logging command to website:", error);
  }
}

// Command handler for specific commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const commandName = `/${interaction.commandName}`;
  const allowedCommands = ['/ban', '/warn', '/mute'];  // List commands that will trigger the bot

  if (allowedCommands.includes(commandName)) {
    logCommandToWebsite(commandName);  // Log the command to the website if it’s allowed
  }

  await interaction.reply(`Command ${commandName} received!`);
});

// Start the bot
client.login(TOKEN);
