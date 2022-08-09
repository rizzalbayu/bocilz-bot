const commands = require('../config/command-handlers');
const autoMessage = require('../config/auto-message');
const dataMessage = require('../message.json');
require('dotenv').config();

module.exports = {
  name: 'messageCreate',
  execute(client, msg) {
    if (msg.author.bot) return;
    const prefix = ['?'];
    let args = '';
    prefix.forEach((prefix) => {
      if (msg.content.startsWith(prefix)) {
        args = msg.content.substring(prefix.length).split(' ');
      }
    });
    if (args) {
      if (args[0]) {
        for (const command of commands) {
          if (args[0] === command[0]) {
            commands.get(args[0]).execute(msg, args, client);
          }
        }
      }
    } else {
      for (const message of dataMessage.messages) {
        const userMessage = msg.content.toLowerCase();
        if (userMessage === message[0] && !message[2]) {
          autoMessage.static(msg, message);
        } else if (userMessage.includes(message[0]) && message[2]) {
          autoMessage.include(msg, message);
        }
      }
    }
  },
};
