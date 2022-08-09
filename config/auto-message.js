const { MessageEmbed } = require('discord.js');

module.exports = {
  // array 0 = key(trigger), array 1 = response, array 2 = include, array 3 = with author, array 4 = reply or broadcast channel
  static: (msg, data) => {
    if (data[4] == 'gif') msg.channel.send(data[1]);
    if (data[4] == 'reply')
      msg.reply(`${data[1]} ${data[3] ? msg.author.username : ''}`);
    if (data[4] == 'channel')
      msg.channel.send(`${data[1]} ${data[3] ? msg.author.username : ''}`);
  },
  include: (msg, data) => {
    if (data[4] == 'gif') msg.channel.send(data[1]);
    if (data[4] == 'reply')
      msg.reply(`${data[1]} ${data[3] ? msg.author.username : ''}`);
    if (data[4] == 'channel')
      msg.channel.send(`${data[1]} ${data[3] ? msg.author.username : ''}`);
  },
};
