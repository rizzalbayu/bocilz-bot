const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  execute(msg, args, client) {
    const embedHelp = new MessageEmbed()
      .setTitle('Bot Command List')
      .addField(
        'Info',
        `**?info** = default info
        **?info bot** = Bot information`
      )
      .addField(
        'About Anime',
        `**?animepeople [name] - [limit]** = Find people in anime industries
        **?findanime [name] - [limit]** = Find anime by anime scene or name (use image upload)
        **default limit = 1**`
      )
      .addField('Harem', '**?waifu** = Get random waifu image')
      .addField('Help', '**?help** = Command list')
      .setFooter(
        `info by ${client.user.username}`,
        client.user.displayAvatarURL()
      );
    msg.channel.send({ embeds: [embedHelp] });
  },
};
