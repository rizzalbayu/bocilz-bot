const { Client, Intents } = require('discord.js');
const http = require('http');
// const config = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (args) => event.execute(client, args));
  } else {
    client.on(event.name, (args) => event.execute(client, args));
  }
}

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Bocilz online');
});

app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}/`);
  client.login(process.env.API_TOKEN);
});
// client.login(config.API_TOKEN);
