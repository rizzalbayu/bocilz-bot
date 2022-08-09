const commands = require('../config/command-handlers');
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
        // array 0 = key(trigger), array 1 = response, array 2 = include, array 3 = with author, array 4 = reply or broadcast channel
        const userMessage = msg.content.toLowerCase();
        if (userMessage === message[0] && !message[2]) {
          this.sent(msg, message);
        } else if (userMessage.includes(message[0]) && message[2]) {
          this.sent(msg, message);
        }
      }
    }
  },
  sent: (msg, data) => {
    if (data[4] == 'gif') msg.channel.send(data[1]);
    if (data[4] == 'reply')
      msg.reply(`${data[1]} ${data[3] ? msg.author.username : ''}`);
    if (data[4] == 'channel')
      msg.channel.send(`${data[1]} ${data[3] ? msg.author.username : ''}`);
  },
};
