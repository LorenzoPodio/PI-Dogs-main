const axios = require('axios');
const { Temperament } = require('../db');

const URL = `https://api.thedogapi.com/v1/breeds`;

const getTemperaments = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    const temperaments = await data.map(t => {
      if (t.temperament) return t.temperament = `${t.temperament.split(', ')},`;
    }).join('').split(',');
    temperaments.forEach(t => {
      Temperament.findOrCreate({
        where: {name: t}
      })      
    });
    const temperamentsDb = await Temperament.findAll();
    console.log('temperamentsDb', temperamentsDb.length);
    return res.json(temperamentsDb);
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports = getTemperaments;