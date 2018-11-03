// Internal dependencies
const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
        updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');
module.exports = apiRouter;

const minionsRouter = require('./minions');

apiRouter.use('/minions', minionsRouter);

