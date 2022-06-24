const commands = require('../config/commandHandlers');
require('dotenv').config();

module.exports = {
    name: 'messageCreate',
    execute(client, msg) {
        if (msg.author.bot) return;
        const prefix = ['?'];
        let args = '';
        prefix.forEach((prefix) => {
            if (msg.content.startsWith(prefix)) {
                args = msg.content.substring(prefix.length).split(' ');
            }
        });
        if (args) {
            if (args[0]) {
                for (const command of commands) {
                    if (args[0] === command[0]) {
                        commands.get(args[0]).execute(msg, args, client);
                    }
                }
            }
        } else {
            const message = msg.content.toLowerCase();
            if (message == 'halo') {
                msg.reply('Halo juga ' + msg.author.username);
            } else if (message == 'hai') {
                msg.reply('Hai juga ' + msg.author.username);
            } else if (message.includes('ah yang bener')) {
                msg.channel.send('Bener kok');
            } else if (message.includes('wkwkwkwk')) {
                msg.channel.send('Ah ga lucu');
            } else if (message.includes('apa kabar')) {
                msg.reply('Alhamdulillah baik');
            }
        }
    },
};
