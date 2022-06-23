const { handlingPermission } = require('../config/permissionHandlers.js');
const config = require('../config.json');
module.exports = {
    name: 'admin',
    execute(msg, args, client) {
        const roleAllowed = config.roles.find((command) => command.admin).admin;
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
