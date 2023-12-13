//Import the express module - a framework for buidling web applications in Node.js
let express = require('express');
//Create an instance of the express router - a modular, mini-application that can handle routes 
let router = express.Router();
//Import file controller.js from controllers folder in parent directory (../)
let controller = require('../controllers/controller');

// << DEFINE ROUTE HANDLERS >>
router.post('/animal', (req,res) => { controller.postAnimal(req,res); });
router.get('/animals', (req,res) => { controller.getAllAnimals(req,res); });
router.delete('/animal/:id', (req,res) => { controller.deleteAnimal(req,res); });

// << EXPORT ROUTER INSTANCE >>
module.exports = router; //When this file is required, the router instance will be made available