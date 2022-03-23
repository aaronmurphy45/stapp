const express = require('express-promise-router');
const router = express();
const sample = require('./sample');

router.use('/sample', sample);

module.exports = router;