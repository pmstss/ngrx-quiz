const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression({ threshold: 0 }));

app.use((req, res, next) => {
    const value = req.header('x-forwarded-proto')
    if (value && value !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/dist/ngrx-quiz'));

app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname + '/robots.txt'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/ngrx-quiz/index.html'));
});

app.listen(process.env.PORT || 4200);
