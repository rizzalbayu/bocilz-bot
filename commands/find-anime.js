const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'findanime',
  async execute(msg, args, client) {
    if (msg.attachments.first()) {
      response = await axios.get(
        `https://api.trace.moe/search?anilistInfo&url=${
          msg.attachments.first().attachment
        }`
      );
      const data = response.data.result.filter(
        (anime) => anime.similarity > 0.9
      );
      if (!data || data.length == 0) {
        msg.reply('Anime tidak ditemukan');
        return;
      }
      const unique = [
        ...new Map(data.map((item, key) => [item[key], item])).values(),
      ];
      const results = [];
      for (const anime of unique.slice(0, 5)) {
        results.push(
          new MessageEmbed()
            .setTitle(`${anime.anilist.title.romaji}`)
            .addField('English title', `${anime.anilist.title.english}`)
            .addField(
              'Url',
              `https://myanimelist.net/anime/${anime.anilist.idMal}`
            )
            .setColor('0x3498db')
            .setFooter(
              `search by ${msg.author.username}`,
              msg.author.displayAvatarURL()
            )
        );
      }
      msg.channel.send({
        content: 'Hasil Pencarian Anime',
        embeds: results,
      });
    } else {
      msg.reply('need some anime image');
    }
  },
};
