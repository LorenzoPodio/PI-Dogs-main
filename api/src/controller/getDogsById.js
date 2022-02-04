const getAllDogs = require('./getAllDogs');

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  try {
    console.log('idRaza', idRaza);
    const dogById = await allDogs.filter(d => d.id == idRaza);
    console.log('dogById', dogById);
    return res.json(dogById);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = getDogsById;