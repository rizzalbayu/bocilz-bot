const commands = require('../config/command-handlers');
const dataMessage = require('../message.json');
require('dotenv').config();
const separator = '||';
const userSpamStatuses = new Array();
const spamAlerts = [
  'Woy jangan spam',
  'Bang sat KAU',
  'Tanya mulu sih',
  'brisik!',
];

module.exports = {
  name: 'messageCreate',
  execute(client, incomingMessage) {
    if (incomingMessage.author.bot) return;
    const prefix = ['?'];
    let args = '';
    prefix.forEach((prefix) => {
      if (incomingMessage.content.startsWith(prefix)) {
        args = incomingMessage.content.substring(prefix.length).split(' ');
      }
    });
    if (args) {
      if (args[0]) {
        for (const command of commands) {
          if (args[0] === command[0]) {
            commands.get(args[0]).execute(incomingMessage, args, client);
          }
        }
      }
    } else {
      for (const message of dataMessage.messages) {
        // array 0 = key(trigger), array 1 = response, array 2 = include, array 3 = with author, array 4 = reply or broadcast channel
        const userMessage = incomingMessage.content.toLowerCase();
        if (
          userMessage === message[0] ||
          (userMessage.includes(message[0]) && message[2])
        ) {
          if (
            !this.checkUserMessageSpam(incomingMessage.author.id, message[0])
          ) {
            incomingMessage.reply(
              spamAlerts[Math.floor(Math.random() * spamAlerts.length)]
            );
            return;
          }
          this.sent(incomingMessage, message);
          this.addUserMessageSpam(incomingMessage.author.id, message[0]);
          return;
        }
        if (message[0].includes(separator)) {
          const keys = message[0].split(separator);
          if (this.isIncludesInOrder(keys, userMessage)) {
            if (message[1] === 'sama random user') {
              if (
                !this.checkUserMessageSpam(
                  incomingMessage.author.id,
                  message[0]
                )
              ) {
                incomingMessage.reply(
                  spamAlerts[Math.floor(Math.random() * spamAlerts.length)]
                );
                return;
              }
              const server = incomingMessage.guild;
              const members = server.members.cache.map((member) => {
                return member.nickname ? member.nickname : member.user.username;
              });
              const member =
                members[Math.floor(Math.random() * members.length)];
              incomingMessage.reply(`Sama ${member}`);
              this.addUserMessageSpam(incomingMessage.author.id, message[0]);
            } else {
              if (
                !this.checkUserMessageSpam(
                  incomingMessage.author.id,
                  message[0]
                )
              ) {
                incomingMessage.reply(
                  spamAlerts[Math.floor(Math.random() * spamAlerts.length)]
                );
                return;
              }
              this.sent(incomingMessage, message);
              this.addUserMessageSpam(incomingMessage.author.id, message[0]);
            }
            return;
          }
        }
      }
    }
  },
  sent: (incomingMessage, message) => {
    const messages = message[1].split(separator);
    const messageSend = messages[Math.floor(Math.random() * messages.length)];
    if (message[4] == 'gif') incomingMessage.channel.send(messageSend);
    if (message[4] == 'reply')
      incomingMessage.reply(
        `${messageSend} ${message[3] ? incomingMessage.author.username : ''}`
      );
    if (message[4] == 'channel')
      incomingMessage.channel.send(
        `${messageSend} ${message[3] ? incomingMessage.author.username : ''}`
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
  checkUserMessageSpam: (id, key) => {
    if (userSpamStatuses.length > 0) {
      for (const [index, userStatus] of userSpamStatuses.entries()) {
        if (userStatus.id === id && userStatus.lastKey === key) {
          if (userStatus.count === 3) {
            userSpamStatuses[index] = {
              id: id,
              lastKey: key,
              count: 0,
            };
            return false;
          }
        }
      }
    }
    return true;
  },
  addUserMessageSpam: (id, key) => {
    if (userSpamStatuses.length > 0) {
      for (const [index, userStatus] of userSpamStatuses.entries()) {
        if (userStatus.id && userStatus.id === id) {
          if (userStatus.lastKey === key) {
            userSpamStatuses[index] = {
              id: id,
              lastKey: key,
              count: userStatus.count + 1,
            };
          } else {
            userSpamStatuses[index] = {
              id: id,
              lastKey: key,
              count: 1,
            };
          }
        } else {
          userSpamStatuses.push({ id: id, lastKey: key, count: 1 });
        }
      }
    } else {
      userSpamStatuses.push({ id: id, lastKey: key, count: 1 });
    }
  },
};
