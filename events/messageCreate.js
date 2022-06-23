const commands = require('../config/commandHandlers');
const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(client, msg) {
        if (msg.author.bot) return;

        let args = '';
        config.prefix.forEach((prefix) => {
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
            if (msg.content == 'halo' || msg.content == 'Halo') {
                msg.reply('Halo juga ' + msg.author.username);
            } else if (msg.content == 'hai' || msg.content == 'Hai') {
                msg.reply('Hai juga ' + msg.author.username);
            } else if (msg.content.includes('ah yang bener')) {
                msg.channel.send('Bener kok');
            } else if (msg.content.includes('wkwk')) {
                msg.channel.send('Ah ga lucu');
            }
        }
    },
};
