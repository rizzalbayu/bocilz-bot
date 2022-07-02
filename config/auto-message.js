module.exports = {
  reply: (msg, data) => {
    console.log(data);
    const message = msg.content.toLowerCase();
    if (message == data[0] && !data[2])
      msg.reply(data[1] + (data[3] ? ` ${msg.author.username}` : ''));
    if (message.includes(data[0]) && data[2])
      msg.reply(data[1] + (data[3] ? ` ${msg.author.username}` : ''));
  },
  channel: (msg, data) => {
    const message = msg.content.toLowerCase();
    if (message == data[0] && !data[2])
      msg.reply(data[1] + (data[3] ? ` ${msg.author.username}` : ''));
    if (message.includes(data[0]) && data[2])
      msg.reply(data[1] + (data[3] ? ` ${msg.author.username}` : ''));
  },
};
