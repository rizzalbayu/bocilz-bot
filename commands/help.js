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
                `**?findanime [name]** = Find anime by anime scene (use image upload)
                **?animepeople [name] | [limit]** = Find people in anime industries (default limit 1)`
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
