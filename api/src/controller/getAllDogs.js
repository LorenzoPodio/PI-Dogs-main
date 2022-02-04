const axios = require('axios');
const { Dog, Temperament } = require('../db');

const URL = `https://api.thedogapi.com/v1/breeds`;

const getApiDogs = async () => {
  const apiData = await axios.get(URL);
  const dataToSend = await apiData.data.map(d => {
    return {
      id: d.id,
      name: d.name,
      height: d.height.metric,
      weight: d.weight.metric,
      life_span: d.life_span,
      ...(d.temperament ? { temperament: d.temperament } : null),
      ...(d.image ? { image: d.image.url } : null)
    }
  });
  return dataToSend;
};

const getDbDogs = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] }
    }
  });
};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = apiDogs.concat(dbDogs);
  return allDogs;
};

module.exports = getAllDogs;