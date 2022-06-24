const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'voiceactor',
    async execute(msg, args, client) {
        const search = msg.content.substring(12);
        console.log(search);
        if (args[1]) {
            const url = `https://api.jikan.moe/v4/people?q=${search}`;
            let data, response;
            try {
                response = await axios.get(url);
                data = response.data.data[0];
            } catch (error) {
                console.log(error);
                return msg.channel.send('get data error');
            }
            console.log(data);
            const embedImage = new MessageEmbed()
                .setTitle(data.name)
                .setColor(0xe67e22)
                .setThumbnail(data.images.jpg.image_url)
                .addField('URL', `${data.url}`)
                .addField('Favorites', `${data.favorites}`)
                .setDescription(data.about)
                .setFooter(
                    `search by ${msg.author.username}`,
                    msg.author.displayAvatarURL()
                );
            msg.channel.send({ embeds: [embedImage] });
        } else {
            msg.channel.send('input voice actor name');
        }
    },
};
