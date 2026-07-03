const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { healthRouter } = require('./routes/health');
const { apiRouter } = require('./routes/api');
const { rootRouter } = require('./routes/root');

const port = 80;

const app = express();

const delay_startup = process.env.DELAY_STARTUP === 'true';
console.log(`Delay Startup: ${delay_startup}`);

app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use('/', healthRouter);
app.use('/', rootRouter);

if (delay_startup) {
    const start = Date.now();

    while (Date.now() - start < 60000) {} // Delay startup for 60 seconds by blocking event loop.
    // It is there to simulate a startup delay of the application, to pretend it is starting.
}

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, () => {
    console.log(`Color API listening on port: ${port}`);
});
})
.catch((err) => {
    console.error('Could not connect to MongoDB');
    console.error(err);
});

