const {createClient} = require('redis');

const client1 = createClient({
    url: 'redis://:master1234@172.18.0.3:6379'
});

const client2 = createClient({
    url: 'redis://:replica1234@172.18.0.4:6379'
});

const client3 = createClient({
    url: 'redis://:replica1234@172.18.0.5:6379'
});

client1.on('error', (err) => console.log('Redis Client Error', err));

client1.connect();

client2.on('error', (err) => console.log('Redis Client Error', err));

client2.connect();

client3.on('error', (err) => console.log('Redis Client Error', err));

client3.connect();

module.exports = {client1,client2,client3};