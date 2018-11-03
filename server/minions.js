const express = require('express');
const minionsRouter = express.Router();
module.exports = minionsRouter;
const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
        updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

minionsRouter.get('/', (req, res, next) => {
    console.log("Recieved GET Request");
   res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
   console.log("Recieved POST Request!");
   const postMinion = addToDatabase('minions', req.query);
   if (postMinion){
       minions.push(postMinion);
       res.status(201).send(postMinion);
   }else{
       res.status(404).send("Error! 404!");
   }
});