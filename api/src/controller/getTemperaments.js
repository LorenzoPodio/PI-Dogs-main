const axios = require('axios');
const { Temperament } = require('../db');

const URL = `https://api.thedogapi.com/v1/breeds`;

const getTemperaments = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    const temperaments = await data.map(t => {
      if (t.temperament) return t.temperament = t.temperament.split(', ');
    }).flat().sort();
    const noDupliTemps = [...new Set(temperaments)];
    noDupliTemps.pop();
    noDupliTemps.forEach(t => {
      Temperament.findOrCreate({
        where: {name: t}
      })      
    });
    const temperamentsDb = await Temperament.findAll();
    // console.log('temperamentsDb', temperamentsDb.length);
    return res.json(temperamentsDb).status(200);
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports = getTemperaments;