const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'waifu',
    async execute(msg, args, client) {
        const url = 'https://api.waifu.pics/sfw/waifu';
        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (error) {
            console.log(error);
            return msg.channel.send('get data error');
        }
        const embedImage = new MessageEmbed()
            .setTitle('waifu')
            .setColor(0xe67e22)
            .setImage(data.url)
            .setFooter(
                `waifu for ${msg.author.username}`,
                msg.author.displayAvatarURL()
            );
        msg.channel.send({ embeds: [embedImage] });
    },
};
