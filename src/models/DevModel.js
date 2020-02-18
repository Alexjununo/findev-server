const Dev = require('../schemas/Dev');
const axios = require('axios');
const parseArray = require('../utils/parseArray');

const getGitHubInfo = async github_username => {
  const api = await axios.get(
    `https://api.github.com/users/${github_username}`
  );
  api.data.name = api.data.name || api.data.login;
  return api.data;
};

exports.getDevs = async () => Dev.find();

exports.createDev = async ({ github_username, techs, latitude, longitude }) => {
  let dev = await Dev.findOne({ github_username });

  if (dev) return { message: 'Dev já cadastrado!' };

  const { name, avatar_url, bio } = await getGitHubInfo(github_username);

  const techsArray = parseArray(techs);
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };

  dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location
  });

  return dev;
};

exports.getDevsByTechs = async ({ latitude, longitude, techs }) => {
  const techsArray = parseArray(techs);

  const devs = Dev.find({
    techs: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    }
  });
  return devs;
};

module.exports = exports;
