const express = require('express');
const minionsRouter = express.Router();
module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
        updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// Getting all Minions
minionsRouter.get('/', (req, res, next) => {
    console.log("Recieved GET Request");
   res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// Getting a single minion

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});