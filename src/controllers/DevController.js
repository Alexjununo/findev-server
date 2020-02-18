const DevModel = require('../models/DevModel');

module.exports.getDevsByTechs = async (request, response) => {
  const result = await DevModel.getDevsByTechs(request.query);

  return response.json(result);
};

module.exports.getDevs = async (request, response) => {
  const result = await DevModel.getDevs();

  return response.json(result);
};

module.exports.createDev = async (request, response) => {
  const result = await DevModel.createDev(request.body);

  return response.json(result);
};
