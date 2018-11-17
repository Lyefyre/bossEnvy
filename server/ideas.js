const ideasRouter = require('express').Router();
module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Meetings Middleware
ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideas = getFromDatabaseById('ideas', id);
    if (ideas) {
        req.ideas = ideas;
        next();
    } else {
        res.status(404).send();
    }
});

// Get all Meetings
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newMinion = addToDatabase('ideas', req.body);
    res.status(201).send(newMinion);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.ideas);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedMinion);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});