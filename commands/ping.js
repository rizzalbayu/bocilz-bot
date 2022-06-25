module.exports = {
  name: 'ping',
  execute(msg, args, client) {
    msg.reply('pong');
  },
};
