const express = require('express');
const redis = require('redis');

const app = express();

// We have a service labled as redis-server so specifying that as the host..
// docker picks that up and allows the communication to that container
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('visits', 0);

console.log('here')

app.get("/", (req, res) => {
    client.get('visits', (err,visits) => {
        res.status(200).json({"Number of visits": visits})
        client.set('visits', parseInt(visits) + 1)
    })
})


app.listen( 8080, () => console.log('running at 8080'));
