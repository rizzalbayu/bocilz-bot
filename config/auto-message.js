module.exports = {
  // array 0 = key(trigger), array 1 = response, array 2 = include, array 3 = with author, array 4 = reply or broadcast channel
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
