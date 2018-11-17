const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;

const { addToDatabase,
    createMeeting,
    deleteAllFromDatabase,
    getAllFromDatabase
} = require('./db');

// Get a single Meeting
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// Update a meeting
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

// Delete a meeting
meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});
