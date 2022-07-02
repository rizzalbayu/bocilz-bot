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
    } else if (args[1]) {
      const search = msg.content.substring(11).split(' - ');
      const url = `https://api.jikan.moe/v4/anime?q=${search[0]}&limit=${
        search[1] ? search[1] : 1
      }`;
      let datas,
        response,
        results = [];
      try {
        response = await axios.get(url);
        datas = response.data.data;
        if (!datas) msg.channel.send(`tidak ada data ${search[1]}`);
      } catch (error) {
        console.log(error);
        return msg.channel.send('get data error');
      }
      for (const anime of datas) {
        results.push(
          new MessageEmbed()
            .setTitle(anime.title)
            .setColor(0xe67e22)
            .setThumbnail(anime.images.jpg.image_url)
            .addField('English title', `${anime.title_english}`)
            .addField('URL', `${anime.url}`)
            .addField(
              'Type and Season',
              `${anime.type} ${anime.season ? anime.season : ''} ${
                anime.year ? anime.year : ''
              } \n
              **Score** : ${anime.score} **Favorites** : ${anime.favorites}`
            )
            .setFooter(
              `search by ${msg.author.username}`,
              msg.author.displayAvatarURL()
            )
        );
      }
      msg.channel.send({ embeds: results });
    } else {
      msg.reply('need some anime image or anime name');
    }
  },
};
