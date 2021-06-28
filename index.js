const express = require('express');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

const logFile = fs.openSync(path.join(PUBLIC_DIR, `log.json`), 'a');

const app = express();

app.use(express.static(PUBLIC_DIR));
app.use(express.json());

app.post('/log', (req, res) => {
    const log = { timestamp: Date.now(), ...req.body };
    fs.write(logFile, JSON.stringify(log), (error) => {
        if (error) {
            res.send({ status: 'fail' });
        } else {
            res.send({ status: 'ok' });
        }
    });
});

app.listen(80, () => {
    console.log('Server started');
});