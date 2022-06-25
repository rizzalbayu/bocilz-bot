const { handlingPermission } = require('../config/permission-handlers.js');
require('dotenv').config();
module.exports = {
  name: 'admin',
  execute(msg, args, client) {
    const roleAllowed = process.env.ADMIN.split(',');
    const owner = msg.guild.ownerId;
    const author = msg.author.id;
    const status = handlingPermission(roleAllowed, msg);
    if (status || owner == author) {
      msg.channel.send('Hi Admin');
    } else {
      msg.channel.send('not Allowed');
      setTimeout(() => {
        msg.channel.bulkDelete(2);
      }, 1000);
    }
  },
};
