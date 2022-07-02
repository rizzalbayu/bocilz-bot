const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'animepeople',
  async execute(msg, args, client) {
    const search = msg.content.substring(13).split(' - ');
    console.log(search);
    if (args[1]) {
      const url = `https://api.jikan.moe/v4/people?q=${search[0]}&limit=${
        search[1] ? search[1] : 1
      }&order_by=favorites&sort=desc`;
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
      for (const people of datas) {
        results.push(
          new MessageEmbed()
            .setTitle(people.name)
            .setColor(0xe67e22)
            .setThumbnail(people.images.jpg.image_url)
            .addField('URL', `${people.url}`)
            .addField('Favorites', `${people.favorites}`)
            .setDescription(people.about ? people.about : '')
            .setFooter(
              `search by ${msg.author.username}`,
              msg.author.displayAvatarURL()
            )
        );
      }
      msg.channel.send({ embeds: results });
    } else {
      msg.channel.send('input voice actor name');
    }
  },
};
