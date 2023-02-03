const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'random',
  async execute(msg, args, client) {
    if (args[1]) {
      if (args[1] == 'user') {
        const server = msg.guild;
        const members = server.members.cache.map((member) => {
          return member.nickname ? member.nickname : member.user.username;
        });
        const member = members[Math.floor(Math.random() * members.length)];
        const embedResult = new MessageEmbed()
          .setTitle('Result User')
          .addField('Username', member)
          .setColor('0x3498db');

        msg.channel.send({ embeds: [embedResult] });
      }
    } else {
      msg.reply('input argument');
    }
  },
};
