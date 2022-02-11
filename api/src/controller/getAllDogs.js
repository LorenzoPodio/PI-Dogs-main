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
      ...(d.temperament ? { temperament: d.temperament } : { temperament: 'Default' }),
      ...(d.image ? { image: d.image.url } : { image: 'https://icon-library.com/images/dog-icon-vector/dog-icon-vector-4.jpg' })
    }
  });
  return dataToSend;
};

const getDbDogs = async () => {
  const arryTempToString = (temperament) =>{
    return temperament.map(t => t.name).join(', ');
  };

  const dogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] }
    }
  });

  const mapedDogs = dogsDB.map(d => {
    console.log('d', d)
    return {
      id: d.id,
      name: d.name,
      height: d.height,
      weight: d.weight,
      life_span: d.life_span,
      temperament: arryTempToString(d.temperaments),
      image: 'https://icon-library.com/images/dog-icon-vector/dog-icon-vector-4.jpg'
    }
  });

  return mapedDogs;
};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = apiDogs.concat(dbDogs);
  console.log('allDogs.length', allDogs.length)
  return allDogs;
};

module.exports = getAllDogs;