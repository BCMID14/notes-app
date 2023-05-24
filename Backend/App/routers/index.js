const express = require('express');
const router = express.Router();
const notesRouter = require('./notes');



router.use('/', notesRouter);


module.exports = router;