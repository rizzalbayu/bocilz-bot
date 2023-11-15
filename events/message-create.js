const commands = require('../config/command-handlers');
const { MessageEmbed } = require('discord.js');
const dataMessage = require('../message.json');
require('dotenv').config();
const separator = '||';
let userSpamStatuses = new Array();
const allowedSpam = 3;
const spamAlerts = ['Woy jangan spam', 'Bang sat KAU', 'Chat mulu sih', 'BRISIK!', 'Baka!!!!'];

function checkLastSpamTime(lastUsed) {
  const currentTime = new Date();
  const elapsedTime = currentTime - lastUsed;
  // expired 5 min
  const expiredSpamTime = 300000;
  if (elapsedTime > expiredSpamTime) return false;
  return true;
}

function sent(incomingMessage, message) {
  const messages = message[1].split(separator);
  const messageSend = messages[Math.floor(Math.random() * messages.length)];
  if (message[4] == 'gif') incomingMessage.channel.send(messageSend);
  if (message[4] == 'reply')
    incomingMessage.reply(`${messageSend} ${message[3] ? incomingMessage.author.username : ''}`);
  if (message[4] == 'channel')
    incomingMessage.channel.send(
      `${messageSend} ${message[3] ? incomingMessage.author.username : ''}`
    );
}

function isIncludesInOrder(keys, message) {
  startIndex = 0;
  for (const key of keys) {
    startIndex = message.indexOf(key, startIndex);
    if (startIndex === -1) {
      return false;
    }
    startIndex += key.length;
  }
  return true;
}

function checkUserMessageSpam(id, key) {
  if (userSpamStatuses.length > 0) {
    for (const [index, userStatus] of userSpamStatuses.entries()) {
      if (userStatus.id === id && userStatus.lastKey === key) {
        if (checkLastSpamTime(userStatus.lastUsed) && userStatus.count >= allowedSpam) {
          userSpamStatuses[index] = {
            id: id,
            lastKey: key,
            lastUsed: new Date(),
            count: 0,
          };
          return false;
        }
        if (!checkLastSpamTime(userStatus.lastUsed)) {
          userSpamStatuses[index] = {
            id: id,
            lastKey: key,
            lastUsed: new Date(),
            count: 0,
          };
        }
      }
    }
  }
  return true;
}

function addUserMessageSpam(id, key) {
  if (userSpamStatuses.length > 0) {
    for (const [index, userStatus] of userSpamStatuses.entries()) {
      if (userStatus.id && userStatus.id === id) {
        if (userStatus.lastKey === key) {
          userSpamStatuses[index] = {
            id: id,
            lastKey: key,
            lastUsed: new Date(),
            count: userStatus.count + 1,
          };
        } else {
          userSpamStatuses[index] = {
            id: id,
            lastKey: key,
            lastUsed: new Date(),
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
}

function getSpamLog(incomingMessage, client) {
  const embedSpamLog = new MessageEmbed()
    .setTitle('User Spam Status List')
    .setColor('0x3498db')
    .setFooter(
      `search by ${incomingMessage.author.username}`,
      incomingMessage.author.displayAvatarURL()
    );
  for (const userSpamStatus of userSpamStatuses) {
    embedSpamLog.addField(
      `${client.users.cache.get(userSpamStatus.id).username}`,
      `Last Key : ${userSpamStatus.lastKey} - Count : ${userSpamStatus.count}`
    );
  }
  incomingMessage.channel.send({ embeds: [embedSpamLog] });
  return;
}

function clearSpamLog(incomingMessage) {
  userSpamStatuses = new Array();
  incomingMessage.channel.send('Clear spam status success');
  return;
}

module.exports = {
  name: 'messageCreate',
  execute(client, incomingMessage) {
    if (incomingMessage.author.bot) return;
    const prefix = ['?'];
    let args = '';
    prefix.forEach((prefix) => {
      if (incomingMessage.content.startsWith(prefix)) {
        console.log(
          `Argument used : "${incomingMessage.content}" by ${
            incomingMessage.author.username
          } at ${new Date()}`
        );
        args = incomingMessage.content.substring(prefix.length).split(' ');
      }
    });
    if (args) {
      if (args[0]) {
        if (args[0] === 'spam') {
          if (args[1] === 'clear') clearSpamLog(incomingMessage);
          if (args[1] === 'list') getSpamLog(incomingMessage, client);
        }

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
        if (userMessage === message[0] || (userMessage.includes(message[0]) && message[2])) {
          if (!checkUserMessageSpam(incomingMessage.author.id, message[0])) {
            incomingMessage.reply(spamAlerts[Math.floor(Math.random() * spamAlerts.length)]);
            return;
          }
          sent(incomingMessage, message);
          console.log(
            `Key used : "${message[0]}" by ${incomingMessage.author.username} at ${new Date()}`
          );
          addUserMessageSpam(incomingMessage.author.id, message[0]);
          return;
        }
        if (message[0].includes(separator)) {
          const keys = message[0].split(separator);
          if (isIncludesInOrder(keys, userMessage)) {
            if (message[1] === 'sama random user') {
              if (!checkUserMessageSpam(incomingMessage.author.id, message[0])) {
                incomingMessage.reply(spamAlerts[Math.floor(Math.random() * spamAlerts.length)]);
                return;
              }
              const server = incomingMessage.guild;
              const members = server.members.cache.map((member) => {
                return member.nickname ? member.nickname : member.user.username;
              });
              const member = members[Math.floor(Math.random() * members.length)];
              incomingMessage.reply(`Sama ${member}`);
              console.log(
                `Key used : "${keys.join(', ')}" by ${
                  incomingMessage.author.username
                } at ${new Date()}`
              );
              addUserMessageSpam(incomingMessage.author.id, message[0]);
            } else {
              if (!checkUserMessageSpam(incomingMessage.author.id, message[0])) {
                incomingMessage.reply(spamAlerts[Math.floor(Math.random() * spamAlerts.length)]);
                return;
              }
              sent(incomingMessage, message);
              console.log(
                `Key used : "${keys.join(', ')}" by ${
                  incomingMessage.author.username
                } at ${new Date()}`
              );
              addUserMessageSpam(incomingMessage.author.id, message[0]);
            }
            return;
          }
        }
      }
    }
  },
};
