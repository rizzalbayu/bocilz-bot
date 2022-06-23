const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    execute(msg, args, client) {
        const embedHelp = new MessageEmbed()
            .setTitle('Bot Command List')
            .addField(
                'Info',
                '?info = default info \n ?info bot = Bot information'
            )
            .addField('Help', '?help = Command list')
            .setFooter(
                `info by ${client.user.username}`,
                client.user.displayAvatarURL()
            );
        msg.channel.send({ embeds: [embedHelp] });
    },
};
