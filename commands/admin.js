const { handlingPermission } = require('../config/permissionHandlers.js');
require('dotenv').config();
module.exports = {
    name: 'admin',
    execute(msg, args, client) {
        const roleAllowed = process.env.ADMIN.split(',');
        console.log(roleAllowed);
        const status = handlingPermission(roleAllowed, msg);
        if (status) {
            msg.channel.send('Hi Admin');
        } else {
            msg.channel.send('not Allowed');
            setTimeout(() => {
                msg.channel.bulkDelete(2);
            }, 1000);
        }
    },
};
