const minionsRouter = require('express').Router();
module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
        updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// Minion Middleware
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
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

// Updating a single minion
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log("Recieved PUT Request");
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

// Delete a single minion
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

// Minion Work Middleware
minionsRouter.param('/:minionId/work', (req, res, next, id) => {
    const minionWork = getFromDatabaseById('minions', id);
    if (minionWork) {
        req.minionWork = minionWork;
        next();
    } else {
        res.status(404).send();
    }
});

// Get all Minion Works
minionsRouter.get('/:minionId/work', (req, res, next) => {
   console.log("GET WORK Request recieved");
   res.send(getAllFromDatabase('minions'));
});

// Add an Array of Minion Works
minionsRouter.post('/minionId/work', (req, res, next) => {
   console.log("POST WORK Request recieved");
   const newMinionWork = addToDatabase('minions', req.body);
   res.status(201).send(newMinionWork);
});

// Update a single Minion Work
minionsRouter.put('/minionId/work', (req, res, next) => {
    console.log("PUT WORK Request recieved");
    const updateMinionWork = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinionWork);
});

// Delete a single Minion Work
minionsRouter.delete('/minionId/work', (req, res, next) => {
   console.log("DEL WORK Request recieved");
   const delMinionWork = deleteFromDatabasebyId('minions', req.params.minionId)
   if (delMinionWork){
       res.status(204);
   } else {
       res.status(500);
   }
});