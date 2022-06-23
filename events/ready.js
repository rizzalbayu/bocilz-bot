module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        client.user.setStatus('online');
        client.user.setActivity('Real Life', { type: 'PLAYING' });
    },
};
