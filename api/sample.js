const express = require('express-promise-router');
const router = express();
const sample = require('./sample');

router.get('/hello', (req, res) => res.send('Hello World!'));

module.exports = router;