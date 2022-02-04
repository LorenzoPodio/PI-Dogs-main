const getAllDogs = require('./getAllDogs');

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  try {
    console.log('idRaza', idRaza);
    const dogById = await allDogs.filter(d => d.id == idRaza);
    console.log('dogById', dogById);
    if(dogById.length !== 0) return res.json(dogById);
    else return res.status(404).send('No existe ninguna raza con el id otorgado');
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = getDogsById;