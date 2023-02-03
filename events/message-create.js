const commands = require('../config/command-handlers');
const dataMessage = require('../message.json');
require('dotenv').config();
const separator = '||';

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
        if (
          userMessage === message[0] ||
          (userMessage.includes(message[0]) && message[2])
        ) {
          this.sent(msg, message);
          return;
        }
        if (message[0].includes(separator)) {
          const keys = message[0].split(separator);
          if (this.isIncludesInOrder(keys, userMessage)) {
            if (message[1] === 'sama random user') {
              const server = msg.guild;
              const members = server.members.cache.map((member) => {
                return member.nickname ? member.nickname : member.user.username;
              });
              const member =
                members[Math.floor(Math.random() * members.length)];
              msg.reply(`Sama ${member}`);
            } else {
              this.sent(msg, message);
            }
            return;
          }
        }
      }
    }
  },
  sent: (msg, message) => {
    const messages = message[1].split(separator);
    const messageSend = messages[Math.floor(Math.random() * messages.length)];
    if (message[4] == 'gif') msg.channel.send(messageSend);
    if (message[4] == 'reply')
      msg.reply(`${messageSend} ${message[3] ? msg.author.username : ''}`);
    if (message[4] == 'channel')
      msg.channel.send(
        `${messageSend} ${message[3] ? msg.author.username : ''}`
      );
  },
  isIncludesInOrder: (keys, message) => {
    startIndex = 0;
    for (const key of keys) {
      startIndex = message.indexOf(key, startIndex);
      if (startIndex === -1) {
        return false;
      }
      startIndex += key.length;
    }
    return true;
  },
};
