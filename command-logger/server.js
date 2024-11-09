const express = require('express');
const app = express();
app.use(express.json());

let commandReceived = false;
let commandName = null;

// Endpoint to log specific commands
app.post('/log-command', (req, res) => {
  const { command } = req.body;
  const allowedCommands = ['/ban', '/warn', '/mute'];  // Specify commands here that will trigger the bot

  if (allowedCommands.includes(command)) {
    commandReceived = true;
    commandName = command;
    res.sendStatus(200);

    // Clear the command after 1 second
    setTimeout(() => {
      commandReceived = false;
      commandName = null;
    }, 1000);  // 1 second
  } else {
    res.status(400).json({ message: 'Command not allowed' });
  }
});

// Endpoint for GitHub Actions to check command status
app.get('/status', (req, res) => {
  res.json({ commandReceived, commandName });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
