const { Router } = require('express');
const DevController = require('./controllers/DevController');
const routes = Router();

routes.get('/search', DevController.getDevsByTechs);
routes.get('/devs', DevController.getDevs);
routes.post('/devs', DevController.createDev);

module.exports = routes;
