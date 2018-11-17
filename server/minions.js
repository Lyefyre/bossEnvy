const express = require('express');
const minionsRouter = express.Router();
module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
        updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// Minion Middleware
minionsRouter.param('/:minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minions = minion;
        next();
    } else {
        res.status(404).send();
    }
});

// Getting all Minions
minionsRouter.get('/', (req, res, next) => {
    console.log("Recieved GET Request");
   res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    console.log("Recieved POST Request");
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// Getting a single minion
minionsRouter.get('/:minionId', (req, res, next) => {
    console.log("Recieved GET Request");
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    console.log("Recieved PUT Request");
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    console.log("Recieved DEL Request");
    const delMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (delMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});