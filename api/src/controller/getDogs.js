const axios = require('axios');
const { Dog, Temperament } = require('../db');
const getAllDogs = require('./getAllDogs');
const URL = `https://api.thedogapi.com/v1/breeds`

const getDogs = async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAllDogs();
  if (name) {
    // const dog = [];
    try {
      const dogByName = allDogs.filter(d => d.name.toLowerCase() === name.toLowerCase());
      if (dogByName.length !== 0) return res.json(dogByName);
      else return res.status(404).send('La raza que estas buscando no existe');
      // const dogDB = await Dog.findAll({
      //   where: { name: name },
      //   include: { model: Temperament }
      // });

      // const dogToPush = dogDB.map(d => {})

      // const dogsApi = await axios.get(`${URL}/search?q=${name}`);
      // const dogsToFilter = mapDogs(dogsApi.data);
      // const dogByName = dogsToFilter.filter(d => d.name.toLowerCase() === name.toLowerCase());
      // console.log('dogByName', dogByName.length);
      // if (dogByName.length !== 0) return res.json(dogByName);
      // return res.status(404).send('La raza que estas buscando no existe');

    } catch {
      return res.status(404).send('Algo malió sal');
    }
  } else {
    try {
      return res.json(allDogs);
    } catch {
      return res.status(404).send('Hubo un error');
    }
  }
  // try {
  //   const { data } = await axios.get(URL);
  //   const dogsApi = mapDogs(data);
  //   return res.json(dogsApi);
  // } catch (error) {
  //   return res.status(404).send(error);
  // }
};

// function mapDogs(array) {
//   const dogsArr = array.map(d => {
//     return {
//       id: d.id,
//       name: d.name,
//       height: d.height.metric,
//       weight: d.weight.metric,
//       life_span: d.life_span,
//       ...(d.temperament ? { temperament: d.temperament } : null),
//       ...(d.image ? { image: d.image.url } : null)
//     }
//   });
//   return dogsArr;
// };

module.exports = getDogs;