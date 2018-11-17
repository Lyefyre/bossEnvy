const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;

const { addToDatabase,
    createMeeting,
    deleteAllFromDatabase,
    getAllFromDatabase
} = require('./db');

// Get all Meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// Add new meetings
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});
