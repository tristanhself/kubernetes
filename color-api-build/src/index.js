const express = require('express');
const os = require('os');

const app = express();
const port = 80;
const color = "blue";
const hostname = os.hostname();

const delay_startup = process.env.DELAY_STARTUP === 'true';
const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(`Delay Startup: ${delay_startup}`);
console.log(`Fail Liveness: ${fail_liveness}`);
console.log(`Fail Readiness: ${fail_readiness}`);

app.get('/', (req, res) => {
    res.send(`<h1 style="color:${color};">Hello from color-api!</h1>
<h2>Hostname: ${hostname}</h2>`);
});

app.get('/api', (req, res) => {
    const { format } = req.query; // localhost/api?format=text or localhost/api?format=json

    if (format === 'json') {
        res.json({
        color,
        hostname
    });
    } else {
        return res.send(`COLOR: ${color}, HOSTNAME: ${hostname}`);
    }

});

app.get('/ready', (req, res) => {
    if (fail_readiness) {
        return res.sendStatus(503);
    }
    return res.send('ok');
});

app.get('/up', (req, res) => {
    return res.send('ok');
});

app.get('/health', (req, res) => {
    if (fail_liveness) {
        return res.sendStatus(503);
    }
    return res.send('ok');
});

if (delay_startup) {
    const start = Date.now();

    while (Date.now() - start < 60000) {} // Delay startup for 60 seconds by blocking event loop.
    // It is there to simulate a startup delay of the application, to pretend it is starting.
}

app.listen(port, () => {
    console.log(`Color API listening on port: ${port}`);
});