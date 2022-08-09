const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  execute(msg, args, client) {
    if (args[1]) {
      if (args[1] == 'bot') {
        // msg.channel.send('Bocilz siyap membantu');
        const embedBot = new MessageEmbed()
          .setTitle(`${client.user.username} Bot`)
          .setDescription(
            `Halo ini Bot Bocilz \n Siyap menggangu di server ini`
          )
          .setColor(0x3498db)
          .setThumbnail(client.user.displayAvatarURL());
        msg.channel.send({ embeds: [embedBot] });
      } else {
        msg.channel.send('bot bocilz sedang aktif');
      }
    } else {
      const embedHelp = new MessageEmbed()
        .setTitle('Info Command List')
        .addField('Bot', `**?info bot** = Bot information`)
        .setFooter(
          `info by ${client.user.username}`,
          client.user.displayAvatarURL()
        );
      msg.channel.send({ embeds: [embedHelp] });
    }
  },
};
